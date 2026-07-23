import { Link } from 'react-router'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

export function IndustryIndex() {
  const phone = usePhone()
  return (
    <>
      <PageHero
        eyebrow="[ Giải pháp theo ngành ]"
        title="Đúng bài toán của ngành bạn, không chung chung"
        sub="Mỗi ngành có chỗ rò rỉ doanh thu riêng. LDK gom website, mini app và tự động hoá thành bộ giải pháp theo từng ngành — kèm lộ trình đầu tư từ nhỏ đến lớn để phần nào cũng tự chứng minh hiệu quả."
      />

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {SITE.industryPages.map((page, i) => (
              <Reveal key={page.slug} delay={(i % 3) * 90} className="h-full">
                <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal transition-transform hover:-translate-y-1 md:p-7">
                  <p className="font-mono text-sm font-medium tracking-[0.2em] text-brand">[0{i + 1}]</p>
                  <h2 className="mt-3 font-display text-xl font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-2xl">
                    {page.nav}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{page.intro}</p>
                  <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm">
                    {page.solutions.map((solution) => (
                      <li key={solution.title} className="flex items-center justify-between gap-3">
                        <span>{solution.title}</span>
                        <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-brand">
                          {solution.from}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/giai-phap/${page.slug}/`}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
                  >
                    Xem giải pháp {page.nav} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-lg border-2 border-ink bg-gold-soft/40 p-6 text-center shadow-brutal md:p-8">
            <h2 className="font-display text-xl font-black uppercase tracking-tight font-expanded md:text-2xl">
              Ngành của bạn chưa có ở đây?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
              LDK đã làm sản phẩm cho đủ loại mô hình kinh doanh — kể bài toán của bạn, nhận phương án
              riêng trong 24 giờ, miễn phí.
            </p>
            <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer" className="mt-6">
              <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo tư vấn miễn phí
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
