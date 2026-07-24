import { Link } from 'react-router'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

/** Định tuyến theo ngành: đưa khách từ trang chủ vào đúng landing giải pháp của ngành họ.
 *  Dùng nguyên dữ liệu industryPages nên không phát sinh nội dung phải bảo trì riêng. */
export function IndustryPicker() {
  const phone = usePhone()

  return (
    <section className="border-t-2 border-ink bg-blueprint py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-brand">
          [03] — Theo ngành của bạn
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
          Bạn kinh doanh ngành nào?
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Mỗi ngành có chỗ rò rỉ doanh thu riêng. Chọn ngành của bạn để xem bộ giải pháp đóng gói
          sẵn — đúng bài toán, kèm lộ trình đầu tư từ nhỏ đến lớn.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {SITE.industryPages.map((page, i) => (
            <Reveal key={page.slug} delay={(i % 3) * 80} className="h-full">
              <Link
                to={`/giai-phap/${page.slug}/`}
                className="group flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal-sm transition-transform hover:-translate-y-1"
              >
                <h3 className="font-display text-lg font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-xl">
                  {page.nav}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {page.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 border-t border-border pt-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  Xem giải pháp
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Ngành của bạn chưa có ở đây?{' '}
          <a
            href={phone.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> Kể bài toán qua Zalo — LDK đề xuất riêng
          </a>
        </p>
      </div>
    </section>
  )
}
