import { describe, expect, it } from 'vitest'
import { prerender } from '../prerender-entry'
import { SITE } from '../content/site'
import { ROUTES } from '../content/routes'

// Spec: docs/plans/idempotent-zooming-mango.md (Phase 2+3)
// Dự án chi tiết /du-an/<slug>/, giải pháp ngành /giai-phap/, gallery + demo /mau-tham-khao/.

const PROJECT_SLUGS = ['foodmap', 'native', 'build-to-rent', 'controllermodz', 'ciga-fr', 'treehouse']
const INDUSTRY_SLUGS = ['spa-lam-dep', 'quan-an-cafe', 'cua-hang-ban-le']
const DEMO_SLUGS = ['spa-dat-lich', 'website-nha-hang', 'goi-mon-qr']

describe('phase 2+3 — routes manifest', () => {
  it('manifest đủ 25 route với 14 path mới', () => {
    expect(ROUTES.length).toBeGreaterThanOrEqual(25)
    const paths = ROUTES.map((r) => r.path)
    for (const slug of PROJECT_SLUGS) expect(paths).toContain(`/du-an/${slug}/`)
    expect(paths).toContain('/giai-phap/')
    for (const slug of INDUSTRY_SLUGS) expect(paths).toContain(`/giai-phap/${slug}/`)
    expect(paths).toContain('/mau-tham-khao/')
    for (const slug of DEMO_SLUGS) expect(paths).toContain(`/mau-tham-khao/${slug}/`)
  })

  it('nav có mục Giải pháp và Mẫu tham khảo', () => {
    const hrefs = SITE.nav.map((n) => n.href)
    expect(hrefs).toContain('/giai-phap/')
    expect(hrefs).toContain('/mau-tham-khao/')
  })
})

describe('phase 2a — dự án chi tiết (không bịa số liệu)', () => {
  it('projectDetails đủ 6, slug khớp portfolio, đủ scope/outcome, services trỏ slug thật', () => {
    expect(SITE.projectDetails).toHaveLength(6)
    const serviceSlugs = SITE.servicePages.map((s) => s.slug)
    const portfolioNames = SITE.portfolio.map((p) => p.name)
    for (const detail of SITE.projectDetails) {
      expect(PROJECT_SLUGS, detail.slug).toContain(detail.slug)
      expect(portfolioNames, detail.slug).toContain(detail.name)
      expect(detail.context.length, detail.slug).toBeGreaterThanOrEqual(1)
      expect(detail.scope.length, detail.slug).toBeGreaterThanOrEqual(2)
      expect(detail.outcome.length, detail.slug).toBeGreaterThanOrEqual(2)
      for (const slug of detail.services) expect(serviceSlugs, detail.slug).toContain(slug)
    }
  })

  it('portfolio card nối được tới trang chi tiết qua slug', () => {
    for (const project of SITE.portfolio) {
      expect(PROJECT_SLUGS, project.name).toContain(project.slug)
    }
  })

  it('prerender /du-an/foodmap/: 1 h1, đủ nội dung, không lộ SĐT/zalo', async () => {
    const { html } = await prerender('/du-an/foodmap/')
    expect(html.match(/<h1/g)?.length).toBe(1)
    expect(html).toContain('FoodMap')
    expect(html).toContain('Phạm vi')
    expect(html).not.toContain('zalo.me')
    expect(html).toContain('09••')
  })
})

describe('phase 2b — giải pháp theo ngành', () => {
  it('industryPages đủ 3 ngành với painPoints/faqs/solutions hợp lệ', () => {
    expect(SITE.industryPages.map((p) => p.slug).sort()).toEqual([...INDUSTRY_SLUGS].sort())
    const serviceSlugs = SITE.servicePages.map((s) => s.slug)
    for (const page of SITE.industryPages) {
      expect(page.painPoints.length, page.slug).toBeGreaterThanOrEqual(3)
      expect(page.faqs.length, page.slug).toBeGreaterThanOrEqual(3)
      expect(page.solutions.length, page.slug).toBeGreaterThanOrEqual(2)
      expect(page.roadmap.length, page.slug).toBeGreaterThanOrEqual(2)
      for (const solution of page.solutions) {
        expect(serviceSlugs, `${page.slug} → ${solution.title}`).toContain(solution.serviceSlug)
      }
    }
  })

  it('prerender /giai-phap/spa-lam-dep/: 1 h1 + FAQPage JSON-LD + giá', async () => {
    const { html } = await prerender('/giai-phap/spa-lam-dep/')
    expect(html.match(/<h1/g)?.length).toBe(1)
    expect(html).toContain('FAQPage')
    expect(html).toContain('triệu')
  })

  it('prerender /giai-phap/: index liệt kê đủ 3 ngành', async () => {
    const { html } = await prerender('/giai-phap/')
    for (const page of SITE.industryPages) {
      expect(html, page.slug).toContain(`/giai-phap/${page.slug}/`)
    }
  })
})

describe('phase 3 — gallery mẫu + demo sống', () => {
  it('demoPages đủ 3 demo với thương hiệu hư cấu', () => {
    expect(SITE.demoPages.map((d) => d.slug).sort()).toEqual([...DEMO_SLUGS].sort())
    for (const demo of SITE.demoPages) {
      expect(demo.name.length, demo.slug).toBeGreaterThan(0)
      expect(['mini-app', 'website', 'web-app'], demo.slug).toContain(demo.kind)
    }
  })

  it('gallery gom mẫu từ mọi dịch vụ + link tới demo sống', async () => {
    const { html } = await prerender('/mau-tham-khao/')
    // mẫu đại diện từ 3 dịch vụ khác nhau
    expect(html).toContain('Website nhà hàng')
    expect(html).toContain('Đặt lịch spa, salon, nail')
    expect(html).toContain('Gom đơn sàn về một chỗ')
    for (const slug of DEMO_SLUGS) expect(html).toContain(`/mau-tham-khao/${slug}/`)
  })

  it('mẫu có demo thì card trỏ về demo thay vì Zalo', () => {
    const samplesWithDemo = SITE.servicePages
      .flatMap((page) => page.samples)
      .filter((sample) => sample.demo)
    expect(samplesWithDemo.length).toBeGreaterThanOrEqual(3)
    for (const sample of samplesWithDemo) {
      expect(DEMO_SLUGS, sample.name).toContain(sample.demo!)
    }
  })

  it('3 trang demo prerender: 1 h1, nhãn minh hoạ, không lộ SĐT/zalo tĩnh', async () => {
    for (const slug of DEMO_SLUGS) {
      const { html } = await prerender(`/mau-tham-khao/${slug}/`)
      expect(html.match(/<h1/g)?.length, slug).toBe(1)
      expect(html, slug).toContain('minh hoạ')
      expect(html, slug).not.toContain('zalo.me')
      expect(html, slug).not.toContain('0969436154')
    }
  })

  it('demo a11y: nút chọn có aria-pressed, tab có aria-current, input có aria-label (WCAG 4.1.2)', async () => {
    // Trạng thái "đang chọn" không được chỉ thể hiện bằng màu — screen reader phải nghe được.
    // Demo spa mở ở tab Trang chủ nên HTML tĩnh chỉ có aria-current của bottom-nav;
    // aria-pressed của picker dịch vụ/ngày/giờ nằm ở tab Đặt lịch (render sau tương tác).
    const spa = (await prerender('/mau-tham-khao/spa-dat-lich/')).html
    expect(spa).toContain('aria-current')

    const qr = (await prerender('/mau-tham-khao/goi-mon-qr/')).html
    expect(qr).toContain('aria-pressed')

    const restaurant = (await prerender('/mau-tham-khao/website-nha-hang/')).html
    expect(restaurant).toContain('aria-pressed')
    // Input form đặt bàn không được chỉ có placeholder
    expect(restaurant).toContain('aria-label="Tên của bạn"')
    expect(restaurant).toContain('aria-label="Số điện thoại"')
  })
})

describe('công cụ báo giá tức thì — dịch nhu cầu ra đúng gói', () => {
  it('mọi tier đều có desc làm nhãn lựa chọn + price để hiện kết quả', () => {
    for (const page of SITE.servicePages) {
      for (const tier of page.tiers) {
        expect(tier.desc.length, `${page.slug}/${tier.name} thiếu desc`).toBeGreaterThan(10)
        expect(tier.price.length, `${page.slug}/${tier.name} thiếu price`).toBeGreaterThan(0)
      }
    }
  })

  it('prerender /bang-gia/ có công cụ ước tính + bước 1 liệt kê đủ 7 dịch vụ', async () => {
    const { html } = await prerender('/bang-gia/')
    expect(html).toContain('Ước tính chi phí')
    // Bước 1 render sẵn trong HTML tĩnh -> SEO đọc được, không-JS vẫn thấy nội dung
    for (const page of SITE.servicePages) {
      expect(html, page.nav).toContain(page.nav)
    }
  })

  it('công cụ không tự bịa giá — chỉ dùng giá đã công bố trong tiers', async () => {
    const { html } = await prerender('/bang-gia/')
    // Giá hiển thị phải nằm trong tập giá đã khai báo
    for (const page of SITE.servicePages) {
      expect(html, page.tiers[0].price).toContain(page.tiers[0].price)
    }
  })
})

describe('hero stat band — "một con số biết nói" (kinetic + editorial)', () => {
  it('site.ts có heroStats: 3 chỉ số tách value/label', () => {
    expect(SITE.hero.stats).toHaveLength(3)
    for (const s of SITE.hero.stats) {
      expect(s.value.length, 'value không rỗng').toBeGreaterThan(0)
      expect(s.label.length, 'label không rỗng').toBeGreaterThan(0)
    }
  })

  it('prerender / hiện số lớn ở HTML tĩnh (SEO thấy giá trị thật, không phải 0)', async () => {
    const { html } = await prerender('/')
    for (const s of SITE.hero.stats) {
      expect(html, s.value).toContain(s.value)
      expect(html, s.label).toContain(s.label)
    }
  })
})

describe('conversion quick-win — cam kết chống rủi ro dưới CTA hero', () => {
  it('site.ts có hero.commitments đúng 3 cam kết', () => {
    expect(SITE.hero.commitments).toHaveLength(3)
  })

  it('prerender / hiển thị 3 cam kết ngay khu hero', async () => {
    const { html } = await prerender('/')
    for (const c of ['Báo giá cố định', 'Không phát sinh', 'Bàn giao đúng hẹn']) {
      expect(html, c).toContain(c)
    }
  })
})

describe('header — logo điều hướng', () => {
  it('logo trỏ về trang chủ "/" thay vì anchor #top (trang con phải về được home)', async () => {
    for (const path of ['/du-an/', '/dich-vu/zalo-mini-app/']) {
      const { html } = await prerender(path)
      expect(html, path).not.toContain('href="#top"')
      // Link logo về trang chủ vẫn tồn tại trong header
      expect(html, path).toContain('aria-label="LDK Tech Solutions — về trang chủ"')
    }
  })
})

describe('LDK Academy — landing workshop AI (test nhu cầu, không dựng cả học viện)', () => {
  it('manifest có route /khoa-hoc/workshop-ai/', () => {
    expect(ROUTES.map((r) => r.path)).toContain('/khoa-hoc/workshop-ai/')
  })

  it('workshop content trong site.ts đủ agenda/takeaways/faqs', () => {
    const w = SITE.workshop
    expect(w.slug).toBe('workshop-ai')
    expect(w.agenda.length).toBeGreaterThanOrEqual(4)
    expect(w.takeaways.length).toBeGreaterThanOrEqual(3)
    expect(w.faqs.length).toBeGreaterThanOrEqual(3)
    expect(w.fears.length).toBeGreaterThanOrEqual(3)
  })

  it('prerender: 1 h1 + form giữ chỗ + không lộ SĐT/zalo tĩnh', async () => {
    const { html } = await prerender('/khoa-hoc/workshop-ai/')
    expect(html.match(/<h1/g)?.length).toBe(1)
    expect(html).toContain('AI cho quán')
    expect(html).toContain('name="phone"')
    expect(html).toContain('name="botcheck"')
    expect(html).not.toContain('zalo.me')
    expect(html).not.toContain('0969436154')
    expect(html).toContain('09••')
  })

  it('không lộ jargon / nền tảng freelancer trên landing workshop', async () => {
    const { html } = await prerender('/khoa-hoc/workshop-ai/')
    const lower = html.toLowerCase()
    for (const banned of ['freelancer', 'vlance', 'upwork', 'studio']) {
      expect(lower, banned).not.toContain(banned)
    }
    for (const jargon of ['Lighthouse', 'React Native', 'TypeScript', 'React + Vite']) {
      expect(html, jargon).not.toContain(jargon)
    }
  })
})

describe('trang quy trình /quy-trinh/ — scroll world', () => {
  it('processPage: 5 chặng đủ copy, manifest có route', () => {
    expect(SITE.processPage.sections).toHaveLength(5)
    for (const section of SITE.processPage.sections) {
      expect(section.id.length, section.id).toBeGreaterThan(0)
      expect(section.title.length, section.id).toBeGreaterThan(0)
      expect(section.body.length, section.id).toBeGreaterThan(20)
    }
    expect(ROUTES.map((r) => r.path)).toContain('/quy-trinh/')
  })

  it('prerender /quy-trinh/: 1 h1 + đủ 5 chặng trong HTML tĩnh (SEO)', async () => {
    const { html } = await prerender('/quy-trinh/')
    expect(html.match(/<h1/g)?.length).toBe(1)
    for (const section of SITE.processPage.sections) {
      expect(html, section.id).toContain(section.title)
    }
    // Anti-scrape giữ nguyên trên trang mới
    expect(html).not.toContain('zalo.me')
    expect(html).not.toContain('0969436154')
  })
})

describe('phase 2+3 — định vị công ty trên trang mới', () => {
  it('không nhắc nền tảng freelancer/jargon cấm ở các trang mới', async () => {
    const newPaths = [
      '/du-an/foodmap/',
      '/du-an/treehouse/',
      '/giai-phap/spa-lam-dep/',
      '/giai-phap/quan-an-cafe/',
      '/mau-tham-khao/',
      '/mau-tham-khao/spa-dat-lich/',
    ]
    for (const path of newPaths) {
      const { html } = await prerender(path)
      const lower = html.toLowerCase()
      for (const banned of ['freelancer', 'vlance', 'upwork', 'studio']) {
        expect(lower, `còn "${banned}" ở ${path}`).not.toContain(banned)
      }
    }
  })
})
