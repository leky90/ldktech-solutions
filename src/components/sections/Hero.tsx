import { ArrowDown, Check, MessageCircle } from 'lucide-react'
import { HeroCanvas } from '@/components/shared/HeroCanvas'
import { CtaLink } from '@/components/shared/CtaLink'
import { LogoMark } from '@/components/shared/Logo'
import { StatBand } from '@/components/shared/StatBand'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

export function Hero() {
  const { hero } = SITE
  const phone = usePhone()

  return (
    <section id="top" className="grain relative overflow-hidden border-b-2 border-ink bg-blueprint">
      <HeroCanvas />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 md:px-6 md:pb-20 md:pt-16">
        <p className="inline-flex items-center gap-2.5 rounded-md border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] tracking-wide shadow-brutal-sm md:text-xs">
          <span className="inline-block size-2 animate-pulse rounded-full bg-gold" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            {/* leading ≥ 1.1 để dấu tiếng Việt (ậ, ệ, ổ) không bị cắt */}
            <h1 className="font-display text-[clamp(2.1rem,6.2vw,4.3rem)] font-black uppercase leading-[1.14] tracking-tight font-expanded">
              <span className="block">{hero.h1Lines[0]}</span>
              <span className="my-2 inline-block -rotate-1 rounded-md border-2 border-ink bg-gold px-3 py-0.5 shadow-brutal md:px-4">
                {hero.h1Lines[1]}
              </span>
              <span className="block text-brand">{hero.h1Lines[2]}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                {hero.ctaPrimary}
              </CtaLink>
              <CtaLink variant="outline" href="#bang-gia">
                <ArrowDown className="size-4" aria-hidden="true" />
                {hero.ctaSecondary}
              </CtaLink>
            </div>

            {/* Cam kết chống rủi ro ngay dưới CTA — chặn do dự phút chót */}
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {hero.commitments.map((item) => (
                <li key={item} className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  <Check className="size-3.5 text-brand" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Khối logo trang trí — chỉ desktop */}
          <div className="hidden lg:col-span-3 lg:flex lg:justify-end lg:self-start lg:pt-8">
            <div className="relative">
              <div className="grid size-44 rotate-3 place-items-center rounded-2xl border-2 border-ink bg-gold text-paper shadow-brutal-lg">
                <LogoMark className="size-28" />
              </div>
              <span className="absolute -bottom-4 -left-10 -rotate-6 rounded-md border-2 border-ink bg-paper px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] shadow-brutal-sm">
                zalo-first ✦ mobile-first
              </span>
            </div>
          </div>
        </div>

        {/* Dải "số biết nói" — số lớn editorial, đếm lên khi cuộn tới */}
        <StatBand stats={hero.stats} />
      </div>
    </section>
  )
}
