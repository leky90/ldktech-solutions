import { Link, Navigate, useParams } from 'react-router'
import { ArrowDown, MessageCircle, X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CtaLink } from '@/components/shared/CtaLink'
import { Reveal } from '@/components/shared/Reveal'
import { TierCard } from '@/components/shared/TierCard'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { JsonLd } from '@/components/shared/JsonLd'
import { SITE } from '@/content/site'
import { faqPageJsonLd } from '@/lib/jsonld'

export function ServicePage() {
  const { slug } = useParams()
  const page = SITE.servicePages.find((s) => s.slug === slug)
  if (!page) return <Navigate to="/" replace />

  const relatedProjects = SITE.portfolio.filter((p) => page.relatedProjects.includes(p.name))

  return (
    <>
      <JsonLd data={faqPageJsonLd(page.faqs)} />

      {/* Hero */}
      <section className="border-b-2 border-ink bg-blueprint">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em]">
            <Link to="/dich-vu/" className="text-brand decoration-gold decoration-2 underline-offset-4 hover:underline">
              Dịch vụ
            </Link>
            <span className="mx-2 text-muted-foreground" aria-hidden="true">/</span>
            <span className="text-muted-foreground">{page.nav}</span>
          </nav>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black uppercase leading-[1.14] tracking-tight font-expanded md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{page.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaLink href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Tư vấn miễn phí qua Zalo
            </CtaLink>
            <CtaLink variant="outline" href="#gia">
              <ArrowDown className="size-4" aria-hidden="true" /> Xem bảng giá
            </CtaLink>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Nghe quen không?
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
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Nếu gật đầu với ít nhất một điều ở trên — phần dưới đây là dành cho bạn.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Bạn nhận được gì
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 3) * 80}>
                <div className="border-t-2 border-ink pt-4">
                  <h3 className="font-display text-base font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bảng giá riêng */}
      <section id="gia" className="scroll-mt-20 border-t-2 border-ink bg-blueprint py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Bảng giá {page.nav}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {page.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90} className="h-full">
                <TierCard tier={tier} />
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs leading-relaxed text-muted-foreground">
            {SITE.pricingNote}
          </p>
        </div>
      </section>

      {/* Quy trình rút gọn */}
      <section className="border-t-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Bốn bước là xong
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.process.map((step) => (
              <li key={step.num} className="border-t-2 border-ink pt-4">
                <p className="font-mono text-xs font-medium tracking-[0.2em] text-brand">{step.num} /</p>
                <h3 className="mt-2 font-display text-base font-black uppercase tracking-tight font-expanded">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ riêng */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Câu hỏi thường gặp về {page.nav}
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

      {/* Dự án liên quan */}
      {relatedProjects.length > 0 ? (
        <section className="border-t-2 border-ink py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
              Dự án LDK đã làm tương tự
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
            <p className="mt-6">
              <Link
                to="/du-an/"
                className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
              >
                Xem tất cả dự án →
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {/* CTA chốt */}
      <section className="border-t-2 border-ink bg-ink py-14 text-paper md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="mx-auto max-w-3xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Kể LDK nghe bạn đang cần gì — nhận phương án trong 24 giờ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/75">
            Tư vấn miễn phí, không ràng buộc. Giá chốt trước khi làm.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
            </CtaLink>
            <CtaLink variant="outline" href={SITE.phoneHref}>
              Gọi {SITE.phone}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
