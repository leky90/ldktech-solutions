import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePhone } from '@/lib/phone'

/** Thanh CTA dính đáy màn hình mobile; tự ẩn khi section Liên hệ đang trong viewport */
export function StickyMobileCta() {
  const [hidden, setHidden] = useState(false)
  const phone = usePhone()

  useEffect(() => {
    const contact = document.getElementById('lien-he')
    if (!contact) return
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.15,
    })
    io.observe(contact)
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="Liên hệ nhanh"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t-2 border-ink bg-paper pb-[env(safe-area-inset-bottom)] transition-transform duration-300 md:hidden',
        hidden && 'translate-y-full',
      )}
    >
      <a
        href={phone.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center justify-center gap-2 bg-gold text-sm font-bold uppercase tracking-wide text-ink"
      >
        <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo
      </a>
      {/* Cũng hiện số như mọi nút gọi khác; text-xs + mono để chuỗi 18 ký tự vừa nửa màn 375px */}
      <a
        href={phone.telHref}
        className="flex h-14 items-center justify-center gap-1.5 border-l-2 border-ink bg-paper font-mono text-xs font-bold tracking-tight text-ink"
      >
        <Phone className="size-4 shrink-0" aria-hidden="true" /> {phone.display}
      </a>
    </nav>
  )
}
