import { LogoMark } from '@/components/shared/Logo'
import { SITE } from '@/content/site'

export function Footer() {
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
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-paper/80 decoration-gold decoration-2 underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Liên hệ
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-paper/80">
              <li>
                <a
                  href={SITE.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decoration-gold decoration-2 underline-offset-4 hover:underline"
                >
                  Zalo — kênh nhanh nhất
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="decoration-gold decoration-2 underline-offset-4 hover:underline">
                  {SITE.phone}
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
          <p>~ built with React + Vite ✦ chuẩn SEO ✦ tải nhanh ~</p>
        </div>
      </div>
    </footer>
  )
}
