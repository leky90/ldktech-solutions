import { Link } from 'react-router'
import { ArrowRight, Check, GraduationCap, Sparkles } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/shared/Reveal'
import { JsonLd } from '@/components/shared/JsonLd'
import { WorkshopSignup } from '@/components/sections/WorkshopSignup'
import { SITE } from '@/content/site'
import { faqPageJsonLd } from '@/lib/jsonld'

export function WorkshopPage() {
  const w = SITE.workshop

  return (
    <>
      <JsonLd data={faqPageJsonLd(w.faqs)} />

      {/* Hero + form giữ chỗ */}
      <section className="border-b-2 border-ink bg-blueprint">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-gold-soft px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                <GraduationCap className="size-3.5" aria-hidden="true" /> {w.eyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-black uppercase leading-[1.14] tracking-tight font-expanded md:text-5xl">
                {w.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{w.intro}</p>

              <dl className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {w.details.map((d) => (
                  <div key={d.label} className="border-t-2 border-ink pt-3">
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                      {d.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <WorkshopSignup />
            </div>
          </div>
        </div>
      </section>

      {/* Nghe quen không — gỡ nỗi sợ */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Nghe quen không?
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {w.fears.map((item, i) => (
              <Reveal key={item.fear} delay={(i % 3) * 80} className="h-full">
                <div className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm">
                  <p className="font-display text-base font-black leading-snug tracking-tight">
                    {item.fear}
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                    {item.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Buổi học có gì */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Buổi học có gì
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {w.agenda.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 80}>
                <li className="flex h-full items-start gap-4 rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md border-2 border-ink bg-gold font-display text-sm font-black">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed md:text-base">{item}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mang về gì */}
      <section className="border-t-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Rời lớp là mang về ngay
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {w.takeaways.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 80}>
                <p className="flex items-start gap-3 rounded-lg border-2 border-ink bg-gold-soft/40 p-4 text-sm leading-relaxed md:text-base">
                  <Sparkles className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ai đứng lớp — practitioner authority */}
      <section className="border-t-2 border-ink bg-ink py-14 text-paper md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Ai đứng lớp
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-display text-xl font-black uppercase leading-[1.3] tracking-tight font-expanded md:text-2xl">
            {w.whoTeaches}
          </p>
          <p className="mt-6">
            <Link
              to="/du-an/"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper decoration-gold decoration-2 underline-offset-4 hover:underline"
            >
              Xem việc LDK đã làm <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-ink bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
            Câu hỏi thường gặp
          </h2>
          <div className="mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {w.faqs.map((faq, i) => (
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

      {/* CTA cuối — về form */}
      <section className="border-t-2 border-ink bg-blueprint py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-4xl">
            Đưa AI vào quán, vào shop của bạn — bắt đầu từ nửa buổi
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Nhóm nhỏ nên số chỗ có hạn mỗi đợt. Để lại số Zalo, LDK giữ chỗ và báo lịch cho bạn.
          </p>
          <a
            href="#top"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-brand px-6 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-brutal"
          >
            Giữ chỗ ngay
          </a>
        </div>
      </section>
    </>
  )
}
