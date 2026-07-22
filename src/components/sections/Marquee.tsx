import { SITE } from '@/content/site'

/** Ticker CSS-only — track nhân đôi để loop liền mạch, pause khi hover / reduced-motion */
export function Marquee() {
  const row = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {SITE.marquee.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 pr-6 font-mono text-xs font-medium uppercase tracking-[0.2em] md:text-sm"
        >
          {item} <span className="text-gold">✦</span>
        </span>
      ))}
    </span>
  )

  return (
    <div className="marquee overflow-hidden border-b-2 border-ink bg-ink py-3.5 text-paper">
      <div className="marquee-track flex">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
