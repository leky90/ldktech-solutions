import { Check } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { cn } from '@/lib/utils'
import type { ServiceTier } from '@/content/site'
import { usePhone } from '@/lib/phone'

/** Card một mức giá của trang dịch vụ — dùng ở ServicePage và trang Bảng giá */
export function TierCard({ tier }: { tier: ServiceTier }) {
  const phone = usePhone()
  // "1 triệu/tháng" -> số lớn + kỳ hạn nhỏ. Nếu để nguyên, token "triệu/tháng" không có
  // khoảng trắng nên trong card hẹp sẽ bị bẻ dòng xấu (hoặc tràn ra ngoài).
  const [priceMain, pricePer] = tier.price.split('/')
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-lg border-2 border-ink p-6',
        tier.highlight ? 'bg-ink text-paper shadow-brutal-brand' : 'bg-paper shadow-brutal',
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
      {/* Cỡ chữ chọn theo chuỗi giá DÀI NHẤT ("từ 45 triệu") để luôn gọn 1 dòng trong card
          hẹp nhất của trang Bảng giá; tracking-tighter mua thêm vài px. */}
      <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5 font-display text-[clamp(1.35rem,1.1vw+0.95rem,1.6rem)] font-black uppercase leading-[1.15] tracking-tighter font-expanded [overflow-wrap:anywhere]">
        {priceMain}
        {pricePer ? (
          <span
            className={cn(
              'font-mono text-xs font-medium lowercase tracking-normal',
              tier.highlight ? 'text-paper/70' : 'text-muted-foreground',
            )}
          >
            /{pricePer}
          </span>
        ) : null}
      </p>
      <p
        className={cn(
          'mt-3 text-sm leading-relaxed',
          tier.highlight ? 'text-paper/80' : 'text-muted-foreground',
        )}
      >
        {tier.desc}
      </p>

      <ul className="mt-5 grid flex-1 gap-2.5 text-sm">
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

      {/* Nhãn ngắn + nowrap: "Nhận báo giá chi tiết" (21 ký tự) vỡ 2 dòng trong card hẹp của
          trang Bảng giá. w-full để 3 nút trong một hàng bằng nhau, nhìn thẳng hàng. */}
      <CtaLink
        href={phone.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        variant={tier.highlight ? 'gold' : 'outline'}
        className="mt-6 w-full whitespace-nowrap px-4"
      >
        Nhận báo giá
      </CtaLink>
    </article>
  )
}
