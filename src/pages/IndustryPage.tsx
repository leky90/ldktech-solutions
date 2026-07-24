import { Link, Navigate, useParams } from 'react-router'
import { ArrowRight, MessageCircle, Play, X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CtaLink } from '@/components/shared/CtaLink'
import { CallCta } from '@/components/shared/CallCta'
import { Reveal } from '@/components/shared/Reveal'
import { JsonLd } from '@/components/shared/JsonLd'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'
import { faqPageJsonLd } from '@/lib/jsonld'

export function IndustryPage() {
  const { slug } = useParams()
  const phone = usePhone()
  const page = SITE.industryPages.find((p) => p.slug === slug)
  if (!page) return <Navigate to="/giai-phap/" replace />

  // Mẫu liên quan gom từ mọi trang dịch vụ theo tag ngành
  const relatedSamples = SITE.servicePages.flatMap((service) =>
    service.samples
      .filter((sample) => page.sampleTags.includes(sample.tag))
      .map((sample) => ({ ...sample, serviceNav: service.nav, serviceSlug: service.slug })),
  )
  const demo = page.demoSlug ? SITE.demoPages.find((d) => d.slug === page.demoSlug) : undefined

  return (
    <>
      <JsonLd data={faqPageJsonLd(page.faqs)} />

      {/* Hero */}
      <section className="border-b-2 border-ink bg-blueprint">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em]">
            <Link to="/giai-phap/" className="text-brand decoration-gold decoration-2 underline-offset-4 hover:underline">
              Giải pháp
            </Link>
            <span className="mx-2 text-muted-foreground" aria-hidden="true">/</span>
            <span className="text-muted-foreground">{page.nav}</span>
          </nav>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black uppercase leading-[1.14] tracking-tight font-expanded md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{page.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Tư vấn miễn phí qua Zalo
            </CtaLink>
            {demo ? (
              <CtaLink variant="outline" href={`/mau-tham-khao/${demo.slug}/`}>
                <Play className="size-4" aria-hidden="true" /> Bấm thử demo
              </CtaLink>
            ) : null}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Chuyện quen của ngành {page.nav}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.painPoints.map((point, i) => (
              <Reveal key={point} delay={(i % 2) * 80}>
                <p className="flex h-full items-start gap-3 rounded-lg border-2 border-ink bg-paper p-4 shadow-brutal-sm">
                  <X className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="text-sm leading-relaxed md:text-base">{point}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bộ giải pháp */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Bộ giải pháp LDK đề xuất
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {page.solutions.map((solution, i) => (
              <Reveal key={solution.title} delay={(i % 3) * 90} className="h-full">
                <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal-sm transition-transform hover:-translate-y-1">
                  <span className="self-start rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                    {solution.from}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-black uppercase leading-[1.2] tracking-tight font-expanded">
                    {solution.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{solution.desc}</p>
                  <Link
                    to={`/dich-vu/${solution.serviceSlug}/`}
                    className="mt-4 border-t border-border pt-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
                  >
                    Chi tiết dịch vụ & bảng giá →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lộ trình đầu tư */}
      <section className="border-t-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Không cần làm tất cả cùng lúc
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Lộ trình chia giai đoạn — mỗi phần tự chứng minh hiệu quả trước khi bạn đầu tư phần sau.
          </p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {page.roadmap.map((step, i) => (
              <li key={step.stage} className="border-t-2 border-ink pt-4">
                <p className="font-mono text-xs font-medium tracking-[0.2em] text-brand">0{i + 1} /</p>
                <h3 className="mt-2 font-display text-base font-black uppercase tracking-tight font-expanded">
                  {step.stage}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mẫu liên quan */}
      {relatedSamples.length > 0 ? (
        <section className="border-t-2 border-ink bg-blueprint py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
              Mẫu hay được ngành {page.nav} đặt làm
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedSamples.map((sample, i) => (
                <Reveal key={`${sample.serviceSlug}-${sample.name}`} delay={(i % 3) * 70} className="h-full">
                  <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm transition-transform hover:-translate-y-1">
                    <span className="self-start rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                      {sample.serviceNav}
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
      ) : null}

      {/* FAQ ngành */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Chủ {page.nav} hay hỏi
          </h2>
          <div className="mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {page.faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="rounded-md border-2 border-ink bg-paper px-5 shadow-brutal-sm last:border-b-2 data-[state=open]:bg-gold-soft/30"
                >
                  <AccordionTrigger className="gap-4 py-4 text-left text-base font-bold hover:no-underline">
                    <span>
                      <span className="mr-2 font-mono text-xs font-medium text-brand">0{i + 1}.</span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA chốt */}
      <section className="border-t-2 border-ink bg-ink py-14 text-paper md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Bắt đầu từ phần đau nhất — nhận lộ trình riêng trong 24 giờ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/75">
            Kể hiện trạng của bạn, LDK đề xuất nên làm gì trước, chi phí bao nhiêu — miễn phí, không ràng buộc.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
            </CtaLink>
            <CallCta />
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <ArrowRight className="size-4 text-gold" aria-hidden="true" />
            <Link
              to="/du-an/"
              className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper decoration-gold decoration-2 underline-offset-4 hover:underline"
            >
              Xem dự án LDK đã làm
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
