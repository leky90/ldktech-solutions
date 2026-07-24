import { Link } from 'react-router'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { LogoMark } from '@/components/shared/Logo'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

/** Các trang phụ ngoài 7 dịch vụ — tách riêng để cột "Khám phá" không bị dồn quá dài */
const EXPLORE_LINKS = [
  { to: '/giai-phap/', label: 'Giải pháp theo ngành' },
  { to: '/du-an/', label: 'Dự án đã làm' },
  { to: '/mau-tham-khao/', label: 'Mẫu tham khảo & demo' },
  { to: '/quy-trinh/', label: 'Quy trình làm việc' },
  { to: '/khoa-hoc/workshop-ai/', label: 'Workshop AI cho chủ tiệm' },
  { to: '/bang-gia/', label: 'Bảng giá' },
]

const linkClass = 'text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline'

export function Footer() {
  const phone = usePhone()
  return (
    <footer className="border-t-2 border-gold bg-brand-deep py-12 text-paper">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Thương hiệu — chiếm 2 cột để đoạn giới thiệu không bị bó thành cột chữ quá hẹp */}
          <div className="lg:col-span-2">
            <span className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg border-2 border-paper/30 bg-gold text-paper">
                <LogoMark className="size-6" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-lg font-black uppercase tracking-tight font-expanded">
                  LDK Tech
                </span>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
                  solutions
                </span>
              </span>
            </span>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">{SITE.footer.about}</p>
          </div>

          <nav aria-label="Dịch vụ">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Dịch vụ
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {SITE.servicePages.map((page) => (
                <li key={page.slug}>
                  <Link to={`/dich-vu/${page.slug}/`} className={linkClass}>
                    {page.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Khám phá">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Khám phá
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Liên hệ
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-paper/80">
              <li>
                <a
                  href={phone.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start gap-2.5 ${linkClass}`}
                >
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  Chat Zalo — nhanh nhất
                </a>
              </li>
              <li>
                {/* Số ẩn tới khi giải mã xong (chống bot); mono nên đổi chuỗi không xê dịch */}
                <a
                  href={phone.telHref}
                  aria-hidden={!phone.ready}
                  className={`flex items-start gap-2.5 font-mono transition-opacity duration-200 ${linkClass}${phone.ready ? '' : ' opacity-0'}`}
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`flex items-start gap-2.5 ${linkClass}`}>
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 font-mono text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE.footer.copyright}</p>
          <p>~ thiết kế &amp; phát triển tại Việt Nam ✦ chuẩn SEO ✦ tải nhanh ~</p>
        </div>
      </div>
    </footer>
  )
}
