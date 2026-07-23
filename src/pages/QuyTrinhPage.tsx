import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { RouteEffects } from '@/components/Layout'
import { LogoMark } from '@/components/shared/Logo'
import { CtaLink } from '@/components/shared/CtaLink'
import { Reveal } from '@/components/shared/Reveal'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

// ── Assets thế giới 3D (Google Flow, dựng dần theo credit — xem docs/plans) ──
// Khi đủ clip: điền path public/quy-trinh/*.mp4 + still poster theo thứ tự 5 chặng,
// trang tự chuyển sang chế độ cinematic; còn thiếu -> hành trình tĩnh bên dưới.
const WORLD_CLIPS: string[] | null = null // ví dụ: ['/quy-trinh/leg1.mp4', ...5 clip]
const WORLD_STILLS: string[] = []

const ACCENTS = ['#6F3CC3', '#F4B400', '#4B2A84', '#FFD166', '#6F3CC3']

/** Trang quy trình — shell riêng ngoài Layout (full-bleed, tối giản như DemoScreen) */
export function QuyTrinhPage() {
  const phone = usePhone()
  const worldRef = useRef<HTMLDivElement>(null)
  const [worldMounted, setWorldMounted] = useState(false)
  const page = SITE.processPage

  useEffect(() => {
    const container = worldRef.current
    if (!container || !WORLD_CLIPS || WORLD_CLIPS.length !== page.sections.length) return
    let cancelled = false
    // Engine chỉ chạy client-side; import động để không vào bundle khi chưa có assets
    import('@/lib/scroll-world/scrub-engine').then(({ mountScrollWorld }) => {
      if (cancelled || !worldRef.current) return
      mountScrollWorld(worldRef.current, {
        brand: { name: SITE.brand, href: '/' },
        sections: page.sections.map((section, i) => ({
          id: section.id,
          label: section.eyebrow,
          eyebrow: section.eyebrow,
          title: section.title,
          body: section.body,
          tags: section.tags,
          accent: ACCENTS[i],
          still: WORLD_STILLS[i],
          clip: WORLD_CLIPS![i],
          ...(i === page.sections.length - 1
            ? { cta: { primary: { label: 'Chat Zalo ngay', href: '#lien-he-cta' } } }
            : null),
        })),
        connectors: [],
      })
      setWorldMounted(true)
    })
    return () => {
      cancelled = true
    }
  }, [page.sections])

  return (
    <>
      <RouteEffects />

      <header className="sticky top-0 z-50 border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] decoration-gold decoration-2 underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Trang chủ
          </Link>
          <span className="rounded-md border border-gold/60 bg-gold/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            Quy trình làm việc
          </span>
          <Link to="/" aria-label="LDK Tech — về trang chủ" className="grid size-9 place-items-center rounded-lg border-2 border-paper/30 bg-gold text-paper">
            <LogoMark className="size-6" />
          </Link>
        </div>
      </header>

      {/* Container cho engine cinematic (kích hoạt khi đủ clip) */}
      <div ref={worldRef} />

      {/* Hành trình tĩnh — nội dung SEO luôn có trong HTML prerender; ẩn khi world mount */}
      {worldMounted ? null : (
        <main className="bg-blueprint">
          <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="max-w-3xl font-display text-3xl font-black uppercase leading-[1.14] tracking-tight font-expanded md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{page.intro}</p>

            <ol className="relative mt-12 flex flex-col gap-10 border-l-2 border-ink pl-8 md:gap-12">
              {page.sections.map((section, i) => (
                <li key={section.id} id={section.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border-2 border-ink bg-gold"
                  />
                  <Reveal delay={(i % 2) * 70}>
                    <article className="rounded-lg border-2 border-ink bg-paper p-6 shadow-brutal-sm md:p-7">
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-brand">
                        {section.eyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-2xl">
                        {section.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {section.body}
                      </p>
                      {section.tags.length > 0 ? (
                        <p className="mt-4 flex flex-wrap gap-2">
                          {section.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                            >
                              {tag}
                            </span>
                          ))}
                        </p>
                      ) : null}
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div id="lien-he-cta" className="mt-14 rounded-lg border-2 border-ink bg-ink p-8 text-center text-paper shadow-brutal">
              <h2 className="mx-auto max-w-2xl font-display text-2xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-3xl">
                Bắt đầu chặng 01 — miễn phí
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-paper/75">
                Kể LDK nghe bài toán của bạn, nhận phương án + báo giá trong 24 giờ.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
                </CtaLink>
                <CtaLink variant="outline" href={phone.telHref}>
                  Gọi {phone.display}
                </CtaLink>
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="border-t-2 border-ink bg-ink py-6 text-center text-paper">
        <p className="font-mono text-xs text-paper/60">LDK Tech Solutions · quy trình minh bạch, giá chốt trước khi làm</p>
      </footer>
    </>
  )
}
