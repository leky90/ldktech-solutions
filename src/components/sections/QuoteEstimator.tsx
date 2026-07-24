import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, MessageCircle, RotateCcw } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'
import { cn } from '@/lib/utils'

/** Công cụ ước tính: dịch nhu cầu kinh doanh -> đúng gói, rồi hiện GIÁ ĐÃ CÔNG BỐ của gói đó.
 *  Không có bảng giá riêng — mọi con số lấy từ SITE.servicePages[].tiers nên không lệch nhau. */
export function QuoteEstimator() {
  const phone = usePhone()
  const [slug, setSlug] = useState<string | null>(null)
  const [tierIdx, setTierIdx] = useState<number | null>(null)

  const service = SITE.servicePages.find((s) => s.slug === slug)
  const tier = service && tierIdx !== null ? service.tiers[tierIdx] : undefined

  const pickService = (next: string) => {
    setSlug(next === slug ? null : next)
    setTierIdx(null)
  }

  const reset = () => {
    setSlug(null)
    setTierIdx(null)
  }

  return (
    <div className="rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal md:p-8">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand">
        Ước tính chi phí — 30 giây, không cần gọi điện
      </p>
      <h2 className="mt-3 font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
        Bạn đang cần gì?
      </h2>

      {/* Bước 1 — render sẵn trong HTML tĩnh để không-JS và Google vẫn đọc được */}
      <div className="mt-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Bước 1 · Chọn loại sản phẩm
        </p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.servicePages.map((page) => {
            const active = page.slug === slug
            return (
              <button
                key={page.slug}
                type="button"
                aria-pressed={active}
                onClick={() => pickService(page.slug)}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-md border-2 border-ink px-4 py-3 text-left transition-transform hover:-translate-y-0.5',
                  active ? 'bg-brand text-primary-foreground shadow-brutal-sm' : 'bg-paper shadow-brutal-sm',
                )}
              >
                <span className="text-sm font-bold">{page.nav}</span>
                <span
                  className={cn(
                    'shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.08em]',
                    active ? 'text-primary-foreground/80' : 'text-brand',
                  )}
                >
                  {page.tiers[0].price.startsWith('từ') ? page.tiers[0].price : `từ ${page.tiers[0].price}`}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bước 2 — mô tả bằng ngôn ngữ kinh doanh, không phải tên gói kỹ thuật */}
      {service ? (
        <div className="mt-7">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Bước 2 · Mô tả nào đúng với bạn nhất?
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            {service.tiers.map((t, i) => {
              const active = i === tierIdx
              return (
                <button
                  key={t.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTierIdx(i === tierIdx ? null : i)}
                  className={cn(
                    'rounded-md border-2 border-ink px-4 py-3 text-left text-sm leading-relaxed transition-transform hover:-translate-y-0.5',
                    active ? 'bg-gold-soft shadow-brutal-sm' : 'bg-paper shadow-brutal-sm',
                  )}
                >
                  {t.desc}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {/* Kết quả */}
      {service && tier ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-7 rounded-md border-2 border-ink bg-blueprint p-5 md:p-6"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Gói phù hợp với bạn
          </p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-black uppercase tracking-tight font-expanded md:text-2xl">
              {service.nav} · {tier.name}
            </h3>
            <p className="font-display text-2xl font-black uppercase tracking-tight text-brand md:text-3xl">
              {tier.price}
            </p>
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm leading-relaxed">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Nhận báo giá chi tiết qua Zalo
            </CtaLink>
            <Link
              to={`/dich-vu/${service.slug}/`}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
            >
              Xem chi tiết dịch vụ <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-ink"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Chọn lại
            </button>
          </div>
        </div>
      ) : null}

      <p className="mt-6 border-t border-border pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {SITE.pricingNote}
      </p>
    </div>
  )
}
