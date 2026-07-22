import { useEffect, useRef } from 'react'

/**
 * Dot-grid generative cho hero: chấm trôi theo sóng sin, né con trỏ chuột.
 * Guardrails: DPR ≤ 2, dừng khi hero ra khỏi viewport / tab ẩn,
 * prefers-reduced-motion -> chỉ vẽ tĩnh 1 lần.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const GAP = 34
    let width = 0
    let height = 0
    let raf = 0
    let running = true
    let t = 0
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const cols = Math.ceil(width / GAP) + 1
      const rows = Math.ceil(height / GAP) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const wave = Math.sin(i * 0.55 + t) * Math.cos(j * 0.45 + t * 0.8)
          let x = i * GAP + wave * 3
          let y = j * GAP + Math.cos(i * 0.35 + t * 0.9) * 3

          // lực đẩy quanh con trỏ
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d2 = dx * dx + dy * dy
          const R = 130
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1
            const f = ((R - d) / R) * 22
            x += (dx / d) * f
            y += (dy / d) * f
          }

          // rắc chấm vàng/tím theo pattern cố định (deterministic)
          const h = (i * 7 + j * 13) % 29
          let fill = 'rgba(33, 26, 59, 0.13)'
          let r = 1.4
          if (h === 0) {
            fill = 'rgba(244, 180, 0, 0.85)'
            r = 2.2
          } else if (h === 14) {
            fill = 'rgba(111, 60, 195, 0.55)'
            r = 2
          }
          ctx.beginPath()
          ctx.arc(x, y, r + Math.abs(wave) * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = fill
          ctx.fill()
        }
      }
    }

    const loop = () => {
      if (!running) return
      t += 0.014
      draw()
      raf = requestAnimationFrame(loop)
    }

    const restart = () => {
      if (reduced) return
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(loop)
    }

    resize()
    draw()
    if (!reduced) raf = requestAnimationFrame(loop)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onResize = () => {
      resize()
      if (reduced) draw()
    }
    const onVisibility = () => {
      running = !document.hidden
      restart()
    }

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden
      restart()
    })
    io.observe(canvas)

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
