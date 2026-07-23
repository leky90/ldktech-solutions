import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/shared/Logo'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const phone = usePhone()

  // Route đang mở -> gạch chân vàng cố định (item hash như /#faq không có active state)
  const isActive = (href: string) =>
    !href.includes('#') && (pathname.endsWith('/') ? pathname : `${pathname}/`).startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Logo />

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink decoration-gold decoration-2 underline-offset-4 hover:underline',
                isActive(item.href) && 'underline',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer" className="hidden h-10 px-4 text-xs sm:inline-flex">
            Nhận báo giá
          </CtaLink>

          {/* Nav mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Mở menu"
              className="grid size-10 place-items-center rounded-md border-2 border-ink bg-paper shadow-brutal-sm lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l-2 border-ink bg-paper">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-lg font-black uppercase tracking-tight">
                  LDK Tech
                </SheetTitle>
                <SheetDescription className="sr-only">Menu điều hướng</SheetDescription>
              </SheetHeader>
              <nav aria-label="Điều hướng mobile" className="flex flex-col gap-1 px-4">
                {SITE.nav.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 border-b border-border py-4 font-display text-2xl font-black uppercase tracking-tight"
                  >
                    <span className="font-mono text-xs font-medium text-brand">0{i + 1}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto px-4 pb-8">
                <CtaLink
                  href={phone.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Nhận báo giá
                </CtaLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
