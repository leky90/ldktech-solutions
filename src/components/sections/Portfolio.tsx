import { Link } from 'react-router'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { SITE } from '@/content/site'

interface PortfolioProps {
  /** số dự án hiển thị (mặc định: tất cả) */
  limit?: number
  showTestimonials?: boolean
  /** hiện link "Xem tất cả dự án" (dùng ở trang chủ khi limit) */
  showAllLink?: boolean
  /** trang /du-an/ đã có h1 hero riêng nên tắt heading section */
  showHeading?: boolean
}

export function Portfolio({
  limit,
  showTestimonials = true,
  showAllLink = false,
  showHeading = true,
}: PortfolioProps) {
  const projects = limit ? SITE.portfolio.slice(0, limit) : SITE.portfolio

  return (
    <section id="du-an" className="scroll-mt-20 border-t-2 border-ink bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showHeading ? (
          <SectionHeading
            index="02"
            label="Dự án đã làm"
            title="Làm thật, đã bàn giao — từ Việt Nam đến Singapore"
            sub="Dự án tiêu biểu LDK Tech đã bàn giao cho khách hàng tại Việt Nam, Anh, Pháp và Singapore — từ website bán hàng đến nền tảng tài chính."
          />
        ) : null}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={(i % 3) * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {showAllLink ? (
          <div className="mt-8">
            <Link
              to="/du-an/"
              className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
            >
              Xem tất cả {SITE.portfolio.length} dự án + review khách →
            </Link>
          </div>
        ) : null}

        {showTestimonials ? (
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
        ) : null}
      </div>
    </section>
  )
}
