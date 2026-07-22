import { Check } from 'lucide-react'
import { Link } from 'react-router'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { SITE } from '@/content/site'
import { cn } from '@/lib/utils'

export function Services() {
  return (
    <section id="dich-vu" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          index="01"
          label="Dịch vụ"
          title="Bốn cách đưa việc kinh doanh của bạn lên online"
          sub="Không bán gói cứng nhắc — LDK tư vấn đúng thứ bạn cần theo giai đoạn kinh doanh, từ mặt tiền online đầu tiên đến hệ thống vận hành riêng."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SITE.services.map((service, i) => (
            <Reveal key={service.num} delay={i * 80}>
              <article
                className={cn(
                  'group flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal transition-transform hover:-translate-y-1 md:p-7',
                  service.badge && 'bg-gold-soft/40',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-sm font-medium tracking-[0.2em] text-brand">
                    [{service.num}]
                  </span>
                  {service.badge ? (
                    <span className="rotate-2 rounded-md border-2 border-ink bg-gold px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] shadow-brutal-sm">
                      ✦ {service.badge}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-display text-xl font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {service.desc}
                </p>

                <p className="mt-4 border-l-2 border-gold pl-3 text-sm leading-relaxed">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Phù hợp với
                  </span>
                  <br />
                  {service.fit}
                </p>

                <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="pt-2 font-display text-lg font-black uppercase tracking-tight">
                    {service.from}
                  </span>
                  <Link
                    to={`/dich-vu/${service.slug}/`}
                    className="pt-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
                  >
                    Chi tiết & bảng giá →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
