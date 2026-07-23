import { MessageCircle } from 'lucide-react'
import { usePhone } from '@/lib/phone'

/** Bubble Zalo nổi góc phải dưới — chỉ desktop (mobile đã có sticky bar riêng) */
export function FloatingZalo() {
  const phone = usePhone()
  return (
    <a
      href={phone.zaloHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border-2 border-ink bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-brutal transition-transform hover:-translate-y-1 md:inline-flex"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      Chat Zalo
    </a>
  )
}
