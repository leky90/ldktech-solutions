import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

/** Logo chữ K trong vòng tròn — vẽ lại từ logo gốc, tô màu qua currentColor */
export function LogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="7">
        <circle cx="32" cy="32" r="24" />
        <path d="M26 15v34" />
        <path d="M26 34 45 15" />
        <path d="M28 31l17 18" />
      </g>
    </svg>
  )
}

export function Logo({ className }: LogoProps) {
  return (
    <a
      href="#top"
      className={cn('flex items-center gap-2.5', className)}
      aria-label="LDK Tech Solutions — về đầu trang"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border-2 border-ink bg-gold text-paper shadow-brutal-sm">
        <LogoMark className="size-6" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-black uppercase tracking-tight font-expanded">
          LDK Tech
        </span>
        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          solutions
        </span>
      </span>
    </a>
  )
}
