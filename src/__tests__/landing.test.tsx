import { describe, expect, it } from 'vitest'
import { prerender } from '../prerender-entry'
import { SITE } from '../content/site'

// Spec: docs/plans/idempotent-zooming-mango.md
// Trang phải prerender ra HTML tĩnh đầy đủ cho SEO + đủ các điểm conversion.

describe('prerender — HTML tĩnh cho SEO', () => {
  it('render đủ các section conversion-critical', async () => {
    const { html } = await prerender()

    // Đúng 1 thẻ H1 (chuẩn SEO)
    expect(html.match(/<h1/g)?.length).toBe(1)

    // Anchor các section chính phải tồn tại (khớp nav)
    for (const id of ['dich-vu', 'du-an', 'quy-trinh', 'bang-gia', 'faq', 'lien-he']) {
      expect(html, `thiếu section #${id}`).toContain(`id="${id}"`)
    }

    // CTA chuyển đổi: Zalo (primary) + gọi điện (tertiary)
    expect(html).toContain('zalo.me')
    expect(html).toContain('tel:')
  })
})

describe('audit fixes — a11y + copy + schema', () => {
  it('form có live region role="status" luôn mount (WCAG 4.1.3)', async () => {
    const { html } = await prerender()
    expect(html).toContain('role="status"')
  })

  it('copy không lộ jargon kỹ thuật (trang hứa "không thuật ngữ khó hiểu")', async () => {
    const { html } = await prerender()
    for (const jargon of ['Lighthouse', 'React Native', 'TypeScript', 'React + Vite']) {
      expect(html, `còn jargon "${jargon}"`).not.toContain(jargon)
    }
  })

  it('JSON-LD trong index.html parse được và không dùng LocalBusiness thiếu address', async () => {
    const { readFileSync } = await import('node:fs')
    const { resolve } = await import('node:path')
    const indexHtml = readFileSync(resolve(import.meta.dirname, '../../index.html'), 'utf-8')
    const blocks = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    expect(blocks.length).toBe(2)
    for (const [, raw] of blocks) {
      const data = JSON.parse(raw) as { '@type': string; address?: unknown }
      // ProfessionalService/LocalBusiness bắt buộc address — nếu không có address thì không được dùng type đó
      if (!data.address) {
        expect(['Organization', 'FAQPage']).toContain(data['@type'])
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

  it('config liên hệ tập trung một chỗ', () => {
    expect(SITE.zaloUrl).toBe('https://zalo.me/0969436154')
    expect(SITE.phoneHref).toBe('tel:+84969436154')
    expect(SITE.siteUrl).toMatch(/^https:\/\//)
    // Form gửi về API tự host (không dùng Web3Forms); để trống -> form ẩn, chỉ hiện Zalo/gọi
    expect(typeof SITE.leadApiUrl).toBe('string')
  })
})
