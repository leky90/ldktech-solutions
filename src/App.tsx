import { Route, Routes } from 'react-router'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { ServicesIndex } from '@/pages/ServicesIndex'
import { ServicePage } from '@/pages/ServicePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { IndustryIndex } from '@/pages/IndustryIndex'
import { IndustryPage } from '@/pages/IndustryPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { PricingPage } from '@/pages/PricingPage'
import { DemoScreen } from '@/pages/demos/DemoScreen'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dich-vu" element={<ServicesIndex />} />
        <Route path="dich-vu/:slug" element={<ServicePage />} />
        <Route path="giai-phap" element={<IndustryIndex />} />
        <Route path="giai-phap/:slug" element={<IndustryPage />} />
        <Route path="du-an" element={<ProjectsPage />} />
        <Route path="du-an/:slug" element={<ProjectDetailPage />} />
        <Route path="mau-tham-khao" element={<GalleryPage />} />
        <Route path="bang-gia" element={<PricingPage />} />
        {/* Path lạ (qua 404.html fallback) -> về trang chủ */}
        <Route path="*" element={<Home />} />
      </Route>
      {/* Demo sống dùng shell riêng — không Header/Footer chính */}
      <Route path="mau-tham-khao/:slug" element={<DemoScreen />} />
    </Routes>
  )
}

export default App
