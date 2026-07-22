import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { SITE } from '@/content/site'

export function Portfolio() {
  return (
    <section id="du-an" className="scroll-mt-20 border-t-2 border-ink bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          index="02"
          label="Dự án đã làm"
          title="Làm thật, đã bàn giao — từ Việt Nam đến Singapore"
          sub="Một phần dự án tiêu biểu từ hồ sơ Freelancer.com (4.9/5★ · 125+ đánh giá) và vLance. Khách hàng tại Việt Nam, Anh, Pháp, Singapore."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SITE.portfolio.map((project, i) => (
            <Reveal key={project.name} delay={(i % 3) * 80} className="h-full">
              <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm transition-transform hover:-translate-y-1">
                <span className="self-start rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                  {project.tag}
                </span>
                <h3 className="mt-3 font-display text-xl font-black uppercase tracking-tight font-expanded">
                  {project.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>
                <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
                  {project.stack}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Review nguyên văn của khách — công khai trên vLance */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SITE.testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 90} className="h-full">
              <blockquote className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal">
                <span aria-hidden="true" className="font-display text-4xl font-black leading-none text-gold">
                  “
                </span>
                <p className="mt-1 flex-1 text-sm leading-relaxed md:text-base">{t.quote}</p>
                <footer className="mt-4 border-t-2 border-ink pt-3">
                  <p className="font-bold">{t.author}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.context}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
