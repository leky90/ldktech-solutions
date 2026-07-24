import { Link, Navigate, useParams } from 'react-router'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { CallCta } from '@/components/shared/CallCta'
import { Reveal } from '@/components/shared/Reveal'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const phone = usePhone()
  const detail = SITE.projectDetails.find((d) => d.slug === slug)
  if (!detail) return <Navigate to="/du-an/" replace />

  const project = SITE.portfolio.find((p) => p.name === detail.name)
  const relatedServices = SITE.servicePages.filter((s) => detail.services.includes(s.slug))
  const otherProjects = SITE.portfolio.filter((p) => p.name !== detail.name).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="border-b-2 border-ink bg-blueprint">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em]">
            <Link to="/du-an/" className="text-brand decoration-gold decoration-2 underline-offset-4 hover:underline">
              Dự án
            </Link>
            <span className="mx-2 text-muted-foreground" aria-hidden="true">/</span>
            <span className="text-muted-foreground">{detail.name}</span>
          </nav>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black uppercase leading-[1.14] tracking-tight font-expanded md:text-5xl">
            {detail.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{detail.summary}</p>
          {project ? (
            <p className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-md border-2 border-ink bg-gold-soft px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                {project.tag}
              </span>
              <span className="rounded-md border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                {project.stack}
              </span>
            </p>
          ) : null}
        </div>
      </section>

      {/* Bài toán */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
                Bài toán
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {detail.context.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal md:p-7">
                <h2 className="font-display text-lg font-black uppercase tracking-tight font-expanded md:text-xl">
                  Phạm vi LDK đảm nhận
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {detail.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kết quả — định tính, trung thực */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Kết quả
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {detail.outcome.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 80} className="h-full">
                <p className="flex h-full items-start gap-3 rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm text-sm leading-relaxed md:text-base">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dịch vụ liên quan */}
      {relatedServices.length > 0 ? (
        <section className="border-t-2 border-ink py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
              Bạn cần một sản phẩm tương tự?
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/dich-vu/${service.slug}/`}
                  className="group flex items-center justify-between gap-4 rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm transition-transform hover:-translate-y-1"
                >
                  <span>
                    <span className="block font-display text-lg font-black uppercase tracking-tight font-expanded">
                      {service.nav}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {service.tiers[0].price.startsWith('từ') ? service.tiers[0].price : `từ ${service.tiers[0].price}`} · bảng giá & FAQ riêng
                    </span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Dự án khác */}
      <section className="border-t-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Dự án khác của LDK
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((other) => (
              <ProjectCard key={other.name} project={other} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA chốt */}
      <section className="border-t-2 border-ink bg-ink py-14 text-paper md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Kể LDK nghe bài toán của bạn — nhận phương án trong 24 giờ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/75">
            Tư vấn miễn phí, không ràng buộc. Giá chốt trước khi làm.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
            </CtaLink>
            <CallCta />
          </div>
        </div>
      </section>
    </>
  )
}
