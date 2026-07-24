import { useEffect, useRef, useState } from 'react'

export interface Stat {
  value: string
  countTo?: number
  suffix?: string
  label: string
}

/** Đếm lên khi cuộn tới. SSR/no-JS luôn render SẴN giá trị thật (SEO đọc được),
 *  chỉ khi có JS + cho phép chuyển động mới tua lại từ 0 rồi đếm lên. */
function useCountUp(stat: Stat, start: boolean) {
  const [display, setDisplay] = useState(stat.value)

  useEffect(() => {
    if (!start || stat.countTo == null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = stat.countTo
    const suffix = stat.suffix ?? ''
    const duration = 900
    let raf = 0
    const t0 = performance.now()

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      // easeOutCubic — nhanh lúc đầu, dừng êm
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(`${Math.round(target * eased)}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, stat.countTo, stat.suffix])

  return display
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const display = useCountUp(stat, start)
  return (
    <div className="flex flex-col gap-1 px-4 py-5 md:px-6">
      <span
        className="font-display text-3xl font-black uppercase leading-none tracking-tight font-expanded text-brand md:text-4xl"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {display}
      </span>
      <span className="font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-muted-foreground">
        {stat.label}
      </span>
    </div>
  )
}

/** Dải chỉ số: số lớn kiểu editorial, chia bằng hairline thay vì viền dày */
export function StatBand({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mt-12 grid divide-y divide-ink/15 rounded-md border-2 border-ink bg-paper shadow-brutal sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} start={start} />
      ))}
    </div>
  )
}
