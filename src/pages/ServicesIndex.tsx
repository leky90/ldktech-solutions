import { Link } from 'react-router'
import { Check, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'

export function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="[ Dịch vụ ]"
        title="Từ dựng sản phẩm đến vận hành mỗi ngày"
        sub="Bốn dịch vụ xây sản phẩm (website, web app, mobile app, Zalo Mini App) và ba dịch vụ đồng hành (trợ lý AI, tự động hoá, chăm sóc website). Mỗi dịch vụ có trang riêng với bảng giá và câu hỏi thường gặp."
      />

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {SITE.servicePages.map((page, i) => (
              <Reveal key={page.slug} delay={(i % 2) * 80} className="h-full">
                <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal transition-transform hover:-translate-y-1 md:p-7">
                  <p className="font-mono text-sm font-medium tracking-[0.2em] text-brand">
                    [0{i + 1}]
                  </p>
                  <h2 className="mt-3 font-display text-xl font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-2xl">
                    {page.nav}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {page.intro}
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm">
                    {page.features.slice(0, 3).map((feature) => (
                      <li key={feature.title} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                        {feature.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                    <span className="pt-2 font-display text-lg font-black uppercase tracking-tight">
                      {page.tiers[0].price.startsWith('từ') ? page.tiers[0].price : `từ ${page.tiers[0].price}`}
                    </span>
                    <Link
                      to={`/dich-vu/${page.slug}/`}
                      className="pt-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
                    >
                      Chi tiết & bảng giá →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-lg border-2 border-ink bg-gold-soft/40 p-6 text-center shadow-brutal md:p-8">
            <h2 className="font-display text-xl font-black uppercase tracking-tight font-expanded md:text-2xl">
              Chưa chắc mình cần gì?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
              Kể bài toán kinh doanh của bạn — LDK tư vấn miễn phí phương án vừa túi tiền, kể cả khi
              câu trả lời là "chưa cần làm gì cả".
            </p>
            <CtaLink href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" className="mt-6">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo tư vấn miễn phí
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
