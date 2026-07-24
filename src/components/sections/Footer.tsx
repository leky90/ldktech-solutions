import { Link } from 'react-router'
import { LogoMark } from '@/components/shared/Logo'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

export function Footer() {
  const phone = usePhone()
  return (
    <footer className="border-t-2 border-gold bg-brand-deep py-12 text-paper">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
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
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
              {SITE.footer.about}
            </p>
          </div>

          <nav aria-label="Liên kết chân trang" className="md:col-span-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Khám phá
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {SITE.servicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    to={`/dich-vu/${page.slug}/`}
                    className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline"
                  >
                    {page.nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/giai-phap/" className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline">
                  Giải pháp theo ngành
                </Link>
              </li>
              <li>
                <Link to="/du-an/" className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline">
                  Dự án đã làm
                </Link>
              </li>
              <li>
                <Link to="/mau-tham-khao/" className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline">
                  Mẫu tham khảo & demo
                </Link>
              </li>
              <li>
                <Link to="/khoa-hoc/workshop-ai/" className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline">
                  Workshop AI cho chủ tiệm
                </Link>
              </li>
              <li>
                <Link to="/bang-gia/" className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline">
                  Bảng giá
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Liên hệ
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-paper/80">
              <li>
                <a
                  href={phone.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-gold decoration-2 underline-offset-4 hover:underline"
                >
                  Zalo — kênh nhanh nhất
                </a>
              </li>
              <li>
                <a href={phone.telHref} className="decoration-gold decoration-2 underline-offset-4 hover:underline">
                  {phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="decoration-gold decoration-2 underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 font-mono text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE.footer.copyright}</p>
          <p>~ thiết kế & phát triển tại Việt Nam ✦ chuẩn SEO ✦ tải nhanh ~</p>
        </div>
      </div>
    </footer>
  )
}
