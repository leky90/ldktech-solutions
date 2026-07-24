import { describe, expect, it } from 'vitest'
import { prerender } from '../prerender-entry'
import { NOT_FOUND_META, ROUTES } from '../content/routes'
import { OG_SIZE, ogEyebrow, ogHeadline, ogImagePath } from '../lib/og'
import { SITE } from '../content/site'

// Phase 4: trang 404 riêng + ảnh chia sẻ (OG) riêng cho từng trang.
// Trước đó: route "*" render <Home /> nên URL sai hiện nguyên trang chủ,
// và cả 27 trang dùng chung một file /og-image.png khi chia sẻ lên Zalo.

const BANNED = ['freelancer', 'vlance', 'upwork', 'studio']

describe('phase 4 — trang 404 riêng', () => {
  it('path lạ render trang 404, KHÔNG phải trang chủ', async () => {
    const { html } = await prerender('/duong-dan-khong-ton-tai/')
    expect(html).toContain('404')
    expect(html).toMatch(/không tìm thấy/i)
    // Dấu hiệu nhận biết trang chủ — không được xuất hiện ở trang 404
    expect(html).not.toContain(SITE.hero.h1Lines[2])
    expect(html).not.toContain(SITE.hero.sub)
  })

  it('đúng 1 thẻ h1 và vẫn có Header/Footer để khách đi tiếp', async () => {
    const { html } = await prerender('/duong-dan-khong-ton-tai/')
    expect(html.match(/<h1/g)?.length).toBe(1)
    expect(html).toContain(SITE.footer.copyright)
  })

  it('mở sẵn lối đi tiếp: về trang chủ + các mục chính của site', async () => {
    const { html } = await prerender('/duong-dan-khong-ton-tai/')
    for (const href of ['/dich-vu/', '/giai-phap/', '/mau-tham-khao/', '/bang-gia/']) {
      expect(html, href).toContain(`href="${href}"`)
    }
  })

  it('không lộ SĐT/zalo trong HTML tĩnh (giữ nguyên luật chống bot)', async () => {
    const { html } = await prerender('/duong-dan-khong-ton-tai/')
    expect(html).not.toContain('zalo.me')
    expect(html).not.toContain('0969436154')
    expect(html).toContain('09••')
  })

  it('copy trang 404 không dính từ cấm về định vị', async () => {
    const { html } = await prerender('/duong-dan-khong-ton-tai/')
    for (const word of BANNED) expect(html.toLowerCase(), word).not.toContain(word)
  })

  it('NOT_FOUND_META có title/description riêng và KHÔNG nằm trong sitemap', () => {
    expect(NOT_FOUND_META.title.length).toBeGreaterThan(10)
    expect(NOT_FOUND_META.title.length).toBeLessThanOrEqual(60)
    expect(NOT_FOUND_META.description.length).toBeGreaterThanOrEqual(50)
    expect(NOT_FOUND_META.description.length).toBeLessThanOrEqual(160)
    // Trang lỗi lọt sitemap sẽ khiến Google index rác
    expect(ROUTES.map((r) => r.path)).not.toContain(NOT_FOUND_META.path)
  })
})

describe('phase 4 — ảnh chia sẻ riêng từng trang', () => {
  it('mọi route có ogImage riêng, không trùng nhau', () => {
    const images = ROUTES.map((r) => r.ogImage)
    for (const [i, image] of images.entries()) {
      expect(image, ROUTES[i].path).toMatch(/^\/og\/[a-z0-9-]+\.png$/)
    }
    expect(new Set(images).size, 'có 2 trang trùng ảnh chia sẻ').toBe(images.length)
    expect(NOT_FOUND_META.ogImage).toMatch(/^\/og\/[a-z0-9-]+\.png$/)
  })

  it('ogImagePath sinh tên file an toàn từ path', () => {
    expect(ogImagePath('/')).toBe('/og/home.png')
    expect(ogImagePath('/bang-gia/')).toBe('/og/bang-gia.png')
    expect(ogImagePath('/dich-vu/zalo-mini-app/')).toBe('/og/dich-vu-zalo-mini-app.png')
    expect(ogImagePath('/khoa-hoc/workshop-ai/')).toBe('/og/khoa-hoc-workshop-ai.png')
  })

  it('ogEyebrow gắn đúng nhóm trang', () => {
    // Trang chủ: không lặp lại tên thương hiệu (logo đã nằm ngay trên nhãn này)
    expect(ogEyebrow('/')).toBe('Phần mềm cho hộ kinh doanh & SME')
    expect(ogEyebrow('/duong-dan-la/')).toBe('Phần mềm cho hộ kinh doanh & SME')
    expect(ogEyebrow('/dich-vu/')).toBe('Dịch vụ')
    expect(ogEyebrow('/dich-vu/zalo-mini-app/')).toBe('Dịch vụ')
    expect(ogEyebrow('/giai-phap/spa-lam-dep/')).toBe('Giải pháp theo ngành')
    expect(ogEyebrow('/du-an/foodmap/')).toBe('Dự án đã làm')
    expect(ogEyebrow('/mau-tham-khao/goi-mon-qr/')).toBe('Mẫu tham khảo')
    expect(ogEyebrow('/quy-trinh/')).toBe('Quy trình làm việc')
    expect(ogEyebrow('/khoa-hoc/workshop-ai/')).toBe('Khoá học')
    expect(ogEyebrow('/bang-gia/')).toBe('Bảng giá')
  })

  it('ogHeadline bỏ đuôi thương hiệu nhưng giữ khi tên nằm giữa câu', () => {
    expect(ogHeadline('LDK Tech — Thiết kế Website, App & Zalo Mini App cho SME')).toBe(
      'Thiết kế Website, App & Zalo Mini App cho SME',
    )
    expect(ogHeadline('Dự án đã làm — 180+ sản phẩm từ 2012 | LDK Tech')).toBe(
      'Dự án đã làm — 180+ sản phẩm từ 2012',
    )
    // "LDK Tech" ở giữa là một phần của câu, cắt đi sẽ vô nghĩa
    expect(ogHeadline('Dịch vụ của LDK Tech — Website, App, AI & Tự động hoá')).toBe(
      'Dịch vụ của LDK Tech — Website, App, AI & Tự động hoá',
    )
  })

  it('headline mọi route đủ ngắn để vẽ vừa thẻ 1200×630', () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 })
    for (const route of ROUTES) {
      const headline = ogHeadline(route.title)
      expect(headline.length, route.path).toBeGreaterThan(0)
      expect(headline.length, route.path).toBeLessThanOrEqual(70)
    }
  })
})
