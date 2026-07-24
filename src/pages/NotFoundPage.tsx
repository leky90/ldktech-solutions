import { Link } from 'react-router'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { CallCta } from '@/components/shared/CallCta'
import { usePhone } from '@/lib/phone'

/** Lối đi tiếp cho khách gõ nhầm hoặc mở link cũ — thứ tự theo mức độ hữu ích
 *  với người vừa lạc đường, không theo thứ tự menu. */
const DESTINATIONS = [
  { to: '/dich-vu/', label: 'Dịch vụ', desc: 'Bảy dịch vụ, từ website tới trợ lý AI' },
  { to: '/bang-gia/', label: 'Bảng giá', desc: 'Giá từng dịch vụ, chốt trước khi làm' },
  { to: '/giai-phap/', label: 'Giải pháp theo ngành', desc: 'Spa, quán ăn, cửa hàng bán lẻ' },
  { to: '/mau-tham-khao/', label: 'Mẫu tham khảo', desc: 'Xem mẫu và bấm thử demo sống' },
  { to: '/du-an/', label: 'Dự án đã làm', desc: 'Sản phẩm thật đã bàn giao cho khách' },
  { to: '/quy-trinh/', label: 'Quy trình làm việc', desc: 'Năm chặng từ ý tưởng tới bàn giao' },
]

export function NotFoundPage() {
  const phone = usePhone()
  return (
    <section className="grain border-b-2 border-ink bg-blueprint">
      <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-brand">
          [ lỗi 404 · trang không tồn tại ]
        </p>

        {/* Số 404 cỡ lớn làm mốc thị giác — aria-hidden vì thông tin đã nằm ở nhãn trên và h1 */}
        <p
          className="mt-2 font-display text-[clamp(5rem,20vw,12rem)] font-black leading-[0.82] tracking-tighter text-ink/10 font-expanded"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="-mt-2 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-black uppercase leading-[1.08] tracking-tight font-expanded">
          Không tìm thấy trang này
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Đường dẫn bạn vừa mở không tồn tại, hoặc đã đổi sang địa chỉ khác. Không sao — chọn một lối
          bên dưới, hoặc nhắn Zalo để tôi chỉ đúng trang bạn đang cần.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
          </CtaLink>
          <CallCta />
          <CtaLink href="/" variant="outline">
            Về trang chủ
          </CtaLink>
        </div>

        <nav aria-label="Các trang chính" className="mt-12 border-t-2 border-ink pt-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Hoặc đi thẳng tới
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm transition-transform hover:-translate-y-1 hover:shadow-brutal"
                >
                  <span className="flex items-center gap-2 font-display text-base font-black uppercase tracking-tight font-expanded">
                    {item.label}
                    <ArrowRight
                      className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
