import type { Faq } from '@/content/site'

/** Sinh schema FAQPage từ data site.ts — một nguồn duy nhất, hết cảnh sửa 2 nơi */
export function faqPageJsonLd(faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}
