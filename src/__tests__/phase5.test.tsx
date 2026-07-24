import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { prerender } from '../prerender-entry'
import { SITE } from '../content/site'

// Spec: docs/features/service-page-style-b.md
// Áp phong cách B (editorial "thở") của /bang-gia/ cho 7 trang /dich-vu/<slug>/.

const SERVICE_PATHS = SITE.servicePages.map((page) => `/dich-vu/${page.slug}/`)
const SAMPLE_PATH = '/dich-vu/zalo-mini-app/'

// Nhãn mục là CHỮ chứ không phải số: các mục trong một trang dịch vụ không phải
// chuỗi có thứ tự nên đánh số chỉ là trang trí (xem spec).
const SECTION_LABELS = ['Vấn đề', 'Phạm vi', 'Mẫu', 'Giá', 'Cách làm', 'Hỏi &amp; đáp', 'Bằng chứng']

/** React escape cả `"` và `'` trong text, không chỉ `&` */
const escape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

describe('phase 5 — phong cách B cho trang dịch vụ', () => {
  it('mỗi mục có nhãn mono riêng ở cột nhãn', async () => {
    const { html } = await prerender(SAMPLE_PATH)
    for (const label of SECTION_LABELS) {
      expect(html, `thiếu nhãn mục "${label}"`).toContain(label)
    }
  })

  it('dùng bố cục lệch 3/9 và đường kẻ mảnh thay viền đen giữa mọi mục', async () => {
    const { html } = await prerender(SAMPLE_PATH)
    expect(html).toContain('lg:col-span-3')
    expect(html).toContain('lg:col-span-9')
    expect(html).toContain('border-ink/20')
    // Nhịp dọc rộng hơn bản cũ (py-14 md:py-20)
    expect(html).toContain('md:py-24')
  })

  it('bỏ nền xen kẽ: chỉ còn 1 dải secondary (mục giá) trên toàn trang', async () => {
    const { html } = await prerender(SAMPLE_PATH)
    // Loại `hover:bg-secondary` của nút outline — chỉ đếm nền thật của section
    expect(html.match(/(?<![\w:-])bg-secondary\b/g)?.length ?? 0).toBe(1)
  })

  it('trang dịch vụ và bảng giá dùng CHUNG một component mục — không trôi khỏi nhau', async () => {
    const service = await prerender(SAMPLE_PATH)
    const pricing = await prerender('/bang-gia/')
    // Dấu vân tay của EditorialSection: cùng cột nhãn 3/9 + cùng kiểu chữ nhãn mono
    for (const marker of ['lg:col-span-3', 'lg:col-span-9', 'tracking-[0.22em]']) {
      expect(service.html, `trang dịch vụ thiếu ${marker}`).toContain(marker)
      expect(pricing.html, `trang bảng giá thiếu ${marker}`).toContain(marker)
    }
  })

  it('rút gọn tiêu đề mục nhưng KHÔNG mất tên dịch vụ khỏi trang (SEO)', async () => {
    for (const page of SITE.servicePages) {
      const { html } = await prerender(`/dich-vu/${page.slug}/`)
      // Tiêu đề mục ngắn lại...
      expect(html, page.slug).toContain('Câu hỏi thường gặp')
      // ...nhưng tên dịch vụ vẫn xuất hiện nhiều lần trong nội dung
      const nav = escape(page.nav)
      expect(html.split(nav).length - 1, `tên "${page.nav}" xuất hiện quá ít`).toBeGreaterThanOrEqual(3)
    }
  })

  it('cỡ chữ giá bám bề rộng CARD, không bám bề rộng màn hình', async () => {
    // Cùng một viewport, TierCard ở /bang-gia/ và trong cột nội dung 9/12 của trang dịch vụ
    // rộng khác nhau, nên clamp theo vw luôn sai ở một trong hai chỗ: ở 1024-1090px card
    // co còn 228px và "TỪ 15 TRIỆU" vỡ 2 dòng. Đo được lần đầu ở khổ 1024px.
    const src = readFileSync(resolve(import.meta.dirname, '../components/shared/TierCard.tsx'), 'utf-8')
    expect(src, 'card phải mở container query').toContain('@container')
    expect(src, 'cỡ chữ giá phải dùng đơn vị cqi').toMatch(/text-\[clamp\([^\]]*cqi/)
    expect(src, 'không được quay lại đơn vị vw cho chữ giá').not.toMatch(/text-\[clamp\([^\]]*vw/)
  })

  it('lưới dự án liên quan chia đôi từ md, không từ sm', () => {
    // Ở 640-767px card chia đôi chỉ còn 248px, tên một từ như "Controllermodz" (14 ký tự,
    // không có chỗ ngắt) tràn khỏi hộp 8px. Lưới 4 bước quy trình dùng sm: vẫn ổn vì chữ ngắn,
    // nên chỉ soi đúng lưới ngay trước relatedProjects.map.
    const src = readFileSync(resolve(import.meta.dirname, '../pages/ServicePage.tsx'), 'utf-8')
    const at = src.indexOf('relatedProjects.map')
    expect(at, 'không tìm thấy khối dự án liên quan').toBeGreaterThan(0)
    const gridClass = src.slice(src.lastIndexOf('className="grid', at), at)
    expect(gridClass).toContain('md:grid-cols-2')
    expect(gridClass).not.toContain('sm:grid-cols-2')
  })

  it('giữ nguyên nội dung sau khi đổi bố cục — cả 7 trang', async () => {
    for (const path of SERVICE_PATHS) {
      const { html } = await prerender(path)
      expect(html.match(/<h1/g)?.length, path).toBe(1)
      expect(html, path).toContain('FAQPage')
      expect(html, path).toContain('triệu')
      expect(html, path).toContain('hay được đặt')
      expect(html, path).toContain('09••')
      expect(html, path).not.toContain('zalo.me')
    }
  })

  it('mỗi trang dịch vụ vẫn render đủ pain point, feature, mẫu và mức giá', async () => {
    for (const page of SITE.servicePages) {
      const { html } = await prerender(`/dich-vu/${page.slug}/`)
      expect(html, page.slug).toContain(escape(page.painPoints[0]))
      expect(html, page.slug).toContain(escape(page.features[0].title))
      expect(html, page.slug).toContain(escape(page.samples[0].name))
      for (const tier of page.tiers) expect(html, `${page.slug}/${tier.name}`).toContain(escape(tier.name))
    }
  })
})
