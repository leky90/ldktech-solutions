import { Link } from 'react-router'
import { MessageCircle, Play } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

const KIND_LABEL = { 'mini-app': 'Zalo Mini App', website: 'Website', 'web-app': 'Web App' } as const

export function GalleryPage() {
  const phone = usePhone()
  return (
    <>
      <PageHero
        eyebrow="[ Mẫu tham khảo ]"
        title="Chọn mẫu gần nhất với việc kinh doanh của bạn"
        sub="Thư viện mẫu theo ngành cho từng dịch vụ — một số mẫu đã có demo sống để bạn bấm thử như khách thật. LDK làm y hệt hoặc chỉnh theo thương hiệu riêng của bạn, giá chốt trước khi làm."
      />

      {/* Demo sống */}
      <section className="border-b-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Demo sống — bấm thử ngay
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Không phải ảnh chụp màn hình: mỗi demo là một bản chạy thật trên trình duyệt, dữ liệu minh
            hoạ với thương hiệu hư cấu. Bấm, chọn, đặt thử — đúng như khách của bạn sẽ làm.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {SITE.demoPages.map((demo, i) => (
              <Reveal key={demo.slug} delay={(i % 3) * 90} className="h-full">
                <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal transition-transform hover:-translate-y-1">
                  <span className="self-start rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                    {KIND_LABEL[demo.kind]}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-black uppercase leading-[1.2] tracking-tight font-expanded">
                    {demo.tagline}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    Thương hiệu minh hoạ "{demo.name}" · {demo.from}
                  </p>
                  <CtaLink href={`/mau-tham-khao/${demo.slug}/`} className="mt-5 h-11 text-xs">
                    <Play className="size-4" aria-hidden="true" /> Bấm thử demo
                  </CtaLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mẫu theo từng dịch vụ */}
      {SITE.servicePages.map((service) => (
        <section key={service.slug} className="border-b-2 border-ink py-14 last:border-b-0 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-2xl">
                Mẫu {service.nav}
              </h2>
              <Link
                to={`/dich-vu/${service.slug}/`}
                className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
              >
                Bảng giá {service.nav} →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.samples.map((sample, i) => (
                <Reveal key={sample.name} delay={(i % 3) * 60} className="h-full">
                  <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm transition-transform hover:-translate-y-1">
                    <span className="self-start rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                      {sample.tag}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-black uppercase leading-[1.2] tracking-tight font-expanded">
                      {sample.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{sample.desc}</p>
                    {sample.demo ? (
                      <Link
                        to={`/mau-tham-khao/${sample.demo}/`}
                        className="mt-4 border-t border-border pt-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
                      >
                        Bấm thử demo sống →
                      </Link>
                    ) : (
                      <a
                        href={phone.zaloHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 border-t border-border pt-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
                      >
                        Đặt mẫu này →
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA chốt */}
      <section className="border-t-2 border-ink bg-ink py-14 text-paper md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Không thấy mẫu vừa ý? LDK thiết kế riêng cho bạn
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/75">
            Mẫu chỉ là điểm bắt đầu — sản phẩm cuối luôn theo thương hiệu và quy trình của riêng bạn.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
            </CtaLink>
            <CtaLink variant="outline" href={phone.telHref}>
              Gọi {phone.display}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
