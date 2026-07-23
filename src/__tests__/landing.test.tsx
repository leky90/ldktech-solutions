import { describe, expect, it } from 'vitest'
import { prerender } from '../prerender-entry'
import { SITE } from '../content/site'
import { ROUTES } from '../content/routes'

// Spec: docs/plans/idempotent-zooming-mango.md
// Multi-page: mỗi route prerender ra HTML tĩnh riêng, meta riêng, sitemap từ manifest.

describe('prerender — HTML tĩnh cho SEO (trang chủ)', () => {
  it('render đủ các section conversion-critical', async () => {
    const { html } = await prerender('/')

    // Đúng 1 thẻ H1 (chuẩn SEO)
    expect(html.match(/<h1/g)?.length).toBe(1)

    // Anchor các section chính trên trang chủ
    for (const id of ['dich-vu', 'du-an', 'quy-trinh', 'bang-gia', 'faq', 'lien-he']) {
      expect(html, `thiếu section #${id}`).toContain(`id="${id}"`)
    }

    // Chống bot quét: HTML tĩnh KHÔNG chứa số thật/tel:/zalo.me — chỉ có mặt nạ,
    // số thật do client giải mã sau hydrate (src/lib/phone.ts)
    expect(html).not.toContain('0969436154')
    expect(html).not.toContain('0969 436 154')
    expect(html).not.toContain('tel:+84')
    expect(html).not.toContain('zalo.me')
    expect(html).toContain('09••')
  })
})

describe('multi-page — routes manifest & từng trang', () => {
  it('manifest đủ 11 route, title/description hợp chuẩn SEO và duy nhất', () => {
    expect(ROUTES.length).toBeGreaterThanOrEqual(11)
    const paths = ROUTES.map((r) => r.path)
    const titles = ROUTES.map((r) => r.title)
    expect(new Set(paths).size).toBe(paths.length)
    expect(new Set(titles).size).toBe(titles.length)
    for (const route of ROUTES) {
      expect(route.path, `path ${route.path} phải có / ở 2 đầu`).toMatch(/^\/([a-z0-9-]+\/)*$/)
      expect(route.title.length, `title quá dài: ${route.title}`).toBeLessThanOrEqual(60)
      expect(route.description.length, `description quá dài: ${route.path}`).toBeLessThanOrEqual(160)
      expect(route.description.length, `description quá ngắn: ${route.path}`).toBeGreaterThanOrEqual(50)
    }
  })

  it('7 trang dịch vụ: giá riêng ≥3 mức, FAQ riêng ≥3 câu', () => {
    expect(SITE.servicePages).toHaveLength(7)
    for (const page of SITE.servicePages) {
      expect(page.tiers.length, page.slug).toBeGreaterThanOrEqual(3)
      expect(page.faqs.length, page.slug).toBeGreaterThanOrEqual(3)
      expect(page.painPoints.length, page.slug).toBeGreaterThanOrEqual(3)
    }
  })

  it('trang dịch vụ prerender: 1 h1 + bảng giá riêng + JSON-LD FAQPage', async () => {
    const { html } = await prerender('/dich-vu/zalo-mini-app/')
    expect(html.match(/<h1/g)?.length).toBe(1)
    expect(html).toContain('FAQPage')
    expect(html).toContain('triệu')
    // SĐT/Zalo không nằm trong HTML tĩnh — client giải mã sau hydrate
    expect(html).not.toContain('zalo.me')
    expect(html).toContain('09••')
  })

  it('mỗi trang dịch vụ có ≥6 mẫu thị trường hay đặt, render trên trang', async () => {
    for (const page of SITE.servicePages) {
      expect(page.samples.length, page.slug).toBeGreaterThanOrEqual(6)
    }
    const { html } = await prerender('/dich-vu/thiet-ke-website/')
    expect(html).toContain('hay được đặt')
    expect(html).toContain('Website nhà hàng')
  })

  it('3 dịch vụ mới prerender đủ h1 + FAQPage + giá', async () => {
    for (const slug of ['tro-ly-ai', 'tu-dong-hoa', 'cham-soc-website']) {
      const { html } = await prerender(`/dich-vu/${slug}/`)
      expect(html.match(/<h1/g)?.length, slug).toBe(1)
      expect(html, slug).toContain('FAQPage')
      expect(html, slug).toContain('triệu')
    }
  })

  it('trang dự án prerender có portfolio + review', async () => {
    const { html } = await prerender('/du-an/')
    expect(html).toContain('FoodMap')
    expect(html).toContain('Đỗ Hồng Nam')
  })
})

describe('audit fixes — a11y + copy + schema', () => {
  it('form có live region role="status" luôn mount (WCAG 4.1.3)', async () => {
    const { html } = await prerender('/')
    expect(html).toContain('role="status"')
  })

  it('copy không lộ jargon kỹ thuật (trang hứa "không thuật ngữ khó hiểu")', async () => {
    for (const path of ['/', '/dich-vu/zalo-mini-app/', '/bang-gia/']) {
      const { html } = await prerender(path)
      for (const jargon of ['Lighthouse', 'React Native', 'TypeScript', 'React + Vite']) {
        expect(html, `còn jargon "${jargon}" ở ${path}`).not.toContain(jargon)
      }
    }
  })

  it('định vị công ty — không nhắc nền tảng freelancer trên site', async () => {
    // Số liệu từ hồ sơ freelancer chỉ dùng nội bộ; website là bộ mặt công ty
    for (const path of ['/', '/du-an/', '/dich-vu/', '/bang-gia/']) {
      const { html } = await prerender(path)
      const lower = html.toLowerCase()
      for (const banned of ['freelancer', 'vlance', 'upwork', 'studio']) {
        expect(lower, `còn "${banned}" ở ${path}`).not.toContain(banned)
      }
    }
  })

  it('JSON-LD trong index.html parse được và không dùng LocalBusiness thiếu address', async () => {
    const { readFileSync } = await import('node:fs')
    const { resolve } = await import('node:path')
    const indexHtml = readFileSync(resolve(import.meta.dirname, '../../index.html'), 'utf-8')
    const blocks = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    // FAQPage đã chuyển vào từng page component — head chỉ còn Organization
    expect(blocks.length).toBe(1)
    for (const [, raw] of blocks) {
      const data = JSON.parse(raw) as { '@type': string; address?: unknown }
      if (!data.address) {
        expect(['Organization']).toContain(data['@type'])
      }
    }
  })
})

describe('content/site.ts — tính toàn vẹn nội dung', () => {
  it('đủ 4 dịch vụ, ≥5 FAQ, ≥3 gói giá', () => {
    expect(SITE.services).toHaveLength(4)
    expect(SITE.faqs.length).toBeGreaterThanOrEqual(5)
    expect(SITE.pricing.length).toBeGreaterThanOrEqual(3)
  })

  it('social proof từ dự án thật (portfolio + review khách)', () => {
    expect(SITE.portfolio.length).toBeGreaterThanOrEqual(4)
    expect(SITE.testimonials.length).toBeGreaterThanOrEqual(2)
  })

  it('config liên hệ tập trung một chỗ, SĐT mã hoá đúng', async () => {
    const { decodePhone } = await import('../lib/phone')
    const info = decodePhone()
    expect(info.display).toBe('0969 436 154')
    expect(info.telHref).toBe('tel:+84969436154')
    expect(info.zaloHref).toBe('https://zalo.me/0969436154')
    expect(SITE.siteUrl).toMatch(/^https:\/\//)
    // Form gửi về API tự host; để trống -> form ẩn, chỉ hiện Zalo/gọi
    expect(typeof SITE.leadApiUrl).toBe('string')
  })
})
