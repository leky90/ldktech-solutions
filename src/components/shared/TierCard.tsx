import { Check } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { cn } from '@/lib/utils'
import { SITE, type ServiceTier } from '@/content/site'

/** Card một mức giá của trang dịch vụ — dùng ở ServicePage và trang Bảng giá */
export function TierCard({ tier }: { tier: ServiceTier }) {
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
      <p className="mt-3 font-display text-3xl font-black uppercase tracking-tight font-expanded">
        {tier.price}
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

      <CtaLink
        href={SITE.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant={tier.highlight ? 'gold' : 'outline'}
        className="mt-6"
      >
        Nhận báo giá chi tiết
      </CtaLink>
    </article>
  )
}
