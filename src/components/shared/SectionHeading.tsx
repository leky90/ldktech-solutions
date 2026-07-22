import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index: string
  label: string
  title: ReactNode
  sub?: string
  className?: string
}

/** Heading Neo-Swiss: hairline trên + chỉ mục mono [0X] + tiêu đề display cỡ lớn */
export function SectionHeading({ index, label, title, sub, className }: SectionHeadingProps) {
  return (
    <div className={cn('border-t-2 border-ink pt-5', className)}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-brand">
        [{index}] — {label}
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-5xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{sub}</p> : null}
    </div>
  )
}
