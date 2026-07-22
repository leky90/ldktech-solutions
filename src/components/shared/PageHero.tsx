import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  sub?: string
  children?: ReactNode
}

/** Hero cho các trang con: eyebrow mono + h1 display + sub, nền blueprint đồng bộ brand */
export function PageHero({ eyebrow, title, sub, children }: PageHeroProps) {
  return (
    <section className="border-b-2 border-ink bg-blueprint">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-brand">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-black uppercase leading-[1.14] tracking-tight font-expanded md:text-5xl">
          {title}
        </h1>
        {sub ? <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{sub}</p> : null}
        {children}
      </div>
    </section>
  )
}
