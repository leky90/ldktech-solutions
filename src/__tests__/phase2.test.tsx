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
