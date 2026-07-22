import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'
import { cn } from '@/lib/utils'

export function Pricing() {
  return (
    <section id="bang-gia" className="scroll-mt-20 border-t-2 border-ink bg-blueprint py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          index="04"
          label="Bảng giá tham khảo"
          title="Giá rõ ràng ngay từ đầu"
          sub="Không cần gọi điện mới biết giá. Đây là mức tham khảo — con số chính xác chốt trước khi bắt đầu, và không đổi giữa chừng."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SITE.pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="h-full">
              <article
                className={cn(
                  'relative flex h-full flex-col rounded-lg border-2 border-ink p-6 md:p-7',
                  tier.highlight
                    ? 'bg-ink text-paper shadow-brutal-brand lg:-translate-y-2'
                    : 'bg-paper shadow-brutal',
                )}
              >
                {tier.highlight ? (
                  <span className="absolute -top-4 right-5 rotate-2 rounded-md border-2 border-ink bg-gold px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-brutal-sm">
                    ✦ Được chọn nhiều nhất
                  </span>
                ) : null}

                <p
                  className={cn(
                    'font-mono text-xs font-medium uppercase tracking-[0.25em]',
                    tier.highlight ? 'text-gold' : 'text-brand',
                  )}
                >
                  {tier.name}
                </p>
                <p className="mt-3 font-display text-3xl font-black uppercase tracking-tight font-expanded">
                  {tier.price}
                </p>
                <p
                  className={cn(
                    'mt-1 font-mono text-xs uppercase tracking-[0.14em]',
                    tier.highlight ? 'text-paper/60' : 'text-muted-foreground',
                  )}
                >
                  {tier.priceNote}
                </p>
                <p
                  className={cn(
                    'mt-4 text-sm leading-relaxed',
                    tier.highlight ? 'text-paper/80' : 'text-muted-foreground',
                  )}
                >
                  {tier.desc}
                </p>

                <ul className="mt-5 grid gap-2.5 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={cn('mt-0.5 size-4 shrink-0', tier.highlight ? 'text-gold' : 'text-brand')}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <CtaLink
                  href="#lien-he"
                  variant={tier.highlight ? 'gold' : 'outline'}
                  className="mt-7"
                >
                  {tier.cta}
                </CtaLink>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs leading-relaxed text-muted-foreground">
          {SITE.pricingNote}
        </p>
      </div>
    </section>
  )
}
