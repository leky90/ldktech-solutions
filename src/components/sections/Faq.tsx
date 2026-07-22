import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal } from '@/components/shared/Reveal'
import { JsonLd } from '@/components/shared/JsonLd'
import { SITE } from '@/content/site'
import { faqPageJsonLd } from '@/lib/jsonld'

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t-2 border-ink py-16 md:py-24">
      <JsonLd data={faqPageJsonLd(SITE.faqs)} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="06"
              label="Câu hỏi thường gặp"
              title="Hỏi thẳng, đáp thật"
              sub="Chưa thấy câu bạn định hỏi? Nhắn Zalo — trả lời trong 2 giờ làm việc."
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Accordion type="single" collapsible className="flex flex-col gap-3">
                {SITE.faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className="rounded-md border-2 border-ink bg-paper px-5 shadow-brutal-sm last:border-b-2 data-[state=open]:bg-gold-soft/30"
                  >
                    <AccordionTrigger className="gap-4 py-4 text-left text-base font-bold hover:no-underline">
                      <span>
                        <span className="mr-2 font-mono text-xs font-medium text-brand">
                          0{i + 1}.
                        </span>
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
