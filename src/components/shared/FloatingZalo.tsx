import { MessageCircle } from 'lucide-react'
import { SITE } from '@/content/site'

/** Bubble Zalo nổi góc phải dưới — chỉ desktop (mobile đã có sticky bar riêng) */
export function FloatingZalo() {
  return (
    <a
      href={SITE.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border-2 border-ink bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-brutal transition-transform hover:-translate-y-1 md:inline-flex"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      Chat Zalo
    </a>
  )
}
