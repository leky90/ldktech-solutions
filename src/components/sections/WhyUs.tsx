import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { SITE } from '@/content/site'

export function WhyUs() {
  return (
    <section className="border-t-2 border-ink py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          index="03"
          label="Vì sao chọn LDK"
          title="Làm thật, giá thật, đồng hành thật"
          sub="Sáu cam kết viết thẳng vào hợp đồng — không phải lời quảng cáo."
        />

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.whyUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <div className="border-t-2 border-ink pt-4">
                <p className="font-mono text-xs font-medium tracking-[0.2em] text-brand">
                  0{i + 1} /
                </p>
                <h3 className="mt-2 font-display text-lg font-black uppercase leading-[1.2] tracking-tight font-expanded">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
