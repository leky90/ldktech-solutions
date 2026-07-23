import type { ComponentType } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowLeft, Check, MessageCircle } from 'lucide-react'
import { RouteEffects } from '@/components/Layout'
import { LogoMark } from '@/components/shared/Logo'
import { CtaLink } from '@/components/shared/CtaLink'
import { PhoneFrame, BrowserFrame } from '@/components/shared/DeviceFrame'
import { SpaBookingDemo } from '@/pages/demos/SpaBookingDemo'
import { RestaurantDemo } from '@/pages/demos/RestaurantDemo'
import { QrOrderDemo } from '@/pages/demos/QrOrderDemo'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

const DEMO_UI: Record<string, ComponentType> = {
  'spa-dat-lich': SpaBookingDemo,
  'website-nha-hang': RestaurantDemo,
  'goi-mon-qr': QrOrderDemo,
}

const DEMO_POINTS: Record<string, string[]> = {
  'spa-dat-lich': [
    'Khách chọn dịch vụ — chọn giờ — xác nhận trong vài chạm',
    'Thẻ thành viên tích điểm giữ chân khách quen',
    'Bản thật gửi xác nhận & nhắc hẹn tự động qua ZNS',
  ],
  'website-nha-hang': [
    'Thực đơn theo nhóm món — đổi giá không cần in lại',
    'Đặt bàn online, quán nhận thông báo ngay',
    'Bản thật kèm chuẩn SEO + Google Maps để khách mới tìm thấy',
  ],
  'goi-mon-qr': [
    'Khách quét QR tại bàn, tự chọn món và gửi order',
    'Order chạy thẳng xuống quầy — giờ cao điểm không loạn',
    'Khách theo dõi trạng thái món ngay trên điện thoại',
  ],
}

/** Trang demo sống — shell riêng, không dùng Header/Footer chính để giữ trải nghiệm "sản phẩm thật" */
export function DemoScreen() {
  const { slug } = useParams()
  const phone = usePhone()
  const demo = SITE.demoPages.find((d) => d.slug === slug)
  if (!demo) return <Navigate to="/mau-tham-khao/" replace />

  const DemoUi = DEMO_UI[demo.slug]
  const service = SITE.servicePages.find((s) => s.slug === demo.serviceSlug)

  return (
    <>
      <RouteEffects />

      {/* Thanh trên: định danh bản demo */}
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <Link
            to="/mau-tham-khao/"
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] decoration-gold decoration-2 underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Mẫu tham khảo
          </Link>
          <span className="rounded-md border border-gold/60 bg-gold/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            Bản demo — dữ liệu minh hoạ
          </span>
          <Link to="/" aria-label="LDK Tech — về trang chủ" className="grid size-9 place-items-center rounded-lg border-2 border-paper/30 bg-gold text-paper">
            <LogoMark className="size-6" />
          </Link>
        </div>
      </header>

      <main className="bg-blueprint">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <h1 className="max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Demo: {demo.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Bản chạy thật trên trình duyệt với thương hiệu hư cấu "{demo.name}" — bấm, chọn, đặt thử
            đúng như khách của bạn sẽ làm. Sản phẩm thật được thiết kế theo thương hiệu riêng của bạn.
          </p>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              {demo.kind === 'website' ? (
                <BrowserFrame url={`bepque.vn — demo minh hoạ`}>
                  <DemoUi />
                </BrowserFrame>
              ) : (
                <PhoneFrame>
                  <DemoUi />
                </PhoneFrame>
              )}
            </div>

            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal">
                <h2 className="font-display text-lg font-black uppercase tracking-tight font-expanded">
                  Mẫu này làm được gì
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {(DEMO_POINTS[demo.slug] ?? []).map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-border pt-4 font-display text-xl font-black uppercase tracking-tight">
                  {demo.from}
                  <span className="ml-2 font-mono text-[11px] font-medium normal-case tracking-normal text-muted-foreground">
                    giá chốt trước khi làm
                  </span>
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer" className="w-full">
                    <MessageCircle className="size-4" aria-hidden="true" /> Đặt mẫu này qua Zalo
                  </CtaLink>
                  {service ? (
                    <CtaLink variant="outline" href={`/dich-vu/${service.slug}/`} className="w-full">
                      Bảng giá {service.nav}
                    </CtaLink>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-ink bg-ink py-6 text-center text-paper">
        <p className="font-mono text-xs text-paper/60">
          Demo bởi LDK Tech Solutions · thương hiệu trong demo là hư cấu, dữ liệu minh hoạ
        </p>
      </footer>
    </>
  )
}
