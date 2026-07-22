import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CtaVariant = 'gold' | 'brand' | 'outline'

interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: CtaVariant
  children: ReactNode
}

const variantClass: Record<CtaVariant, string> = {
  gold: 'bg-gold text-ink hover:bg-gold-soft',
  brand: 'bg-brand text-primary-foreground hover:bg-brand-deep',
  outline: 'bg-paper text-ink hover:bg-secondary',
}

/** Nút CTA kiểu soft-brutalism: viền đậm + hard shadow, nhấc lên khi hover */
export function CtaLink({ variant = 'gold', className, children, ...props }: CtaLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-ink px-6 text-sm font-bold uppercase tracking-wider shadow-brutal-sm transition-[transform,box-shadow,background-color] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-brutal-sm',
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
