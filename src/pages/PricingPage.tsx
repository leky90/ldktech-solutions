import { Link } from 'react-router'
import { MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { TierCard } from '@/components/shared/TierCard'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'

export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="[ Bảng giá ]"
        title="Giá rõ ràng cho từng dịch vụ"
        sub="Không cần gọi điện mới biết giá. Mức dưới đây là tham khảo — con số chính xác chốt sau buổi tư vấn miễn phí, và không đổi giữa chừng."
      />

      {SITE.servicePages.map((page, index) => (
        <section
          key={page.slug}
          className={index % 2 === 1 ? 'border-t-2 border-ink bg-secondary py-14 md:py-20' : 'border-t-2 border-ink py-14 md:py-20 first:border-t-0'}
        >
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
                {page.nav}
              </h2>
              <Link
                to={`/dich-vu/${page.slug}/`}
                className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
              >
                Xem trang dịch vụ →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {page.tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 80} className="h-full">
                  <TierCard tier={tier} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t-2 border-ink bg-ink py-14 text-paper md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Không thấy gói vừa với mình?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/75">
            Mọi con số ở trên đều co giãn theo phạm vi thật. Kể bài toán của bạn — LDK báo giá chi
            tiết từng hạng mục trong 24 giờ, miễn phí.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
            </CtaLink>
            <CtaLink variant="outline" href={SITE.phoneHref}>
              Gọi {SITE.phone}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
