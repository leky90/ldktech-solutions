import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { SITE } from '@/content/site'

export function Process() {
  return (
    <section id="quy-trinh" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          index="03"
          label="Quy trình"
          title="Bốn bước, không bước nào mập mờ"
          sub="Bạn luôn biết đang ở đâu, tốn bao nhiêu, và bao giờ xong."
        />

        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SITE.process.map((step, i) => (
            <Reveal key={step.num} delay={i * 90} className="h-full">
              <li className="relative flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm">
                <span className="grid size-11 place-items-center rounded-md border-2 border-ink bg-gold font-display text-lg font-black shadow-brutal-sm">
                  {step.num}
                </span>
                {/* mũi tên nối bước — chỉ desktop */}
                {i < SITE.process.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-5 top-8 hidden font-display text-xl font-black text-brand lg:block"
                  >
                    →
                  </span>
                ) : null}
                <h3 className="mt-4 font-display text-base font-black uppercase leading-[1.2] tracking-tight font-expanded md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
