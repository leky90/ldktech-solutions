import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Pricing } from '@/components/sections/Pricing'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      {/* Home chỉ hiện 3 dự án nổi bật — đầy đủ ở /du-an/ */}
      <Portfolio limit={3} showTestimonials={false} showAllLink />
      <WhyUs />
      <Process />
      <Pricing />
      <Faq />
      <Contact />
    </>
  )
}
