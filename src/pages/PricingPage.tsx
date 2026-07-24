import { Link } from 'react-router'
import { MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { TierCard } from '@/components/shared/TierCard'
import { CtaLink } from '@/components/shared/CtaLink'
import { CallCta } from '@/components/shared/CallCta'
import { EditorialSection } from '@/components/shared/EditorialSection'
import { QuoteEstimator } from '@/components/sections/QuoteEstimator'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

export function PricingPage() {
  const phone = usePhone()
  return (
    <>
      <PageHero
        eyebrow="[ Bảng giá ]"
        title="Giá rõ ràng cho từng dịch vụ"
        sub="Không cần gọi điện mới biết giá. Mức dưới đây là tham khảo — con số chính xác chốt sau buổi tư vấn miễn phí, và không đổi giữa chừng."
      />

      {/* Công cụ ước tính đặt ngay đầu trang — người tìm giá thấy đường đi ngắn nhất */}
      <section className="border-b-2 border-ink bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <QuoteEstimator />
        </div>
      </section>

      {/* Editorial "thở": mục lục đánh số, hairline chia mục thay nền xen kẽ, nhiều khoảng trắng.
          Số 01–07 ở đây đánh dấu một danh sách 7 dịch vụ CÓ THẬT nên mang thông tin.
          Bỏ kẻ mảnh của mục đầu bằng index chứ không bằng `first:`: PricingPage trả về
          fragment nên các section là con trực tiếp của <main>, mục 01 là con thứ 3 chứ
          không phải :first-child — `first:` sẽ không bao giờ khớp và kẻ mảnh vẽ chồng
          lên viền 2px của khối ước tính ngay trên. */}
      {SITE.servicePages.map((page, index) => (
        <EditorialSection
          key={page.slug}
          label={String(index + 1).padStart(2, '0')}
          title={page.nav}
          intro={page.intro}
          aside={
            <Link
              to={`/dich-vu/${page.slug}/`}
              className="mt-5 inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
            >
              Xem trang dịch vụ →
            </Link>
          }
          className={index === 0 ? 'border-t-0' : undefined}
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {page.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80} className="h-full">
                <TierCard tier={tier} />
              </Reveal>
            ))}
          </div>
        </EditorialSection>
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
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
            </CtaLink>
            <CallCta />
          </div>
        </div>
      </section>
    </>
  )
}
