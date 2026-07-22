import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Pricing } from '@/components/sections/Pricing'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { StickyMobileCta } from '@/components/shared/StickyMobileCta'
import { FloatingZalo } from '@/components/shared/FloatingZalo'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <WhyUs />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCta />
      <FloatingZalo />
    </>
  )
}

export default App
