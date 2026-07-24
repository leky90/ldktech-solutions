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
  // "Báo giá riêng" (13 ký tự) là chuỗi giá dài nhất; nếu bắt nó cùng cỡ với con số thì
  // MỌI card phải co theo nó. Nhưng đó là một nhãn chứ không phải con số — không cần to
  // bằng. Tách 2 cỡ để các mức có giá thật được hiển thị đúng tầm.
  const isNumber = /\d/.test(priceMain)
  return (
    <article
      className={cn(
        // @container: cỡ chữ giá bám bề rộng CARD chứ không phải bề rộng màn hình —
        // cùng một viewport, card ở /bang-gia/ và ở cột nội dung 9/12 của trang dịch vụ
        // rộng khác nhau, nên clamp theo vw luôn sai ở một trong hai chỗ.
        '@container relative flex h-full flex-col rounded-lg border-2 border-ink p-6',
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
      {/* cqi = % bề rộng TRONG của card, nên cỡ chữ bám card chứ không bám màn hình.
          Ngưỡng chọn để chuỗi dài nhất của từng nhóm gọn 1 dòng ở card hẹp nhất (228px,
          rơi vào khoảng màn hình 1024-1090px); tracking-tighter mua thêm vài px. */}
      <p
        className={cn(
          'mt-3 flex flex-wrap items-baseline gap-x-1.5 font-display font-black uppercase leading-[1.15] tracking-tighter font-expanded [overflow-wrap:anywhere]',
          isNumber
            ? 'text-[clamp(1.25rem,12cqi,1.7rem)]'
            : 'text-[clamp(1.05rem,9cqi,1.35rem)]',
        )}
      >
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
