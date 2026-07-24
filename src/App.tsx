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
import { QuyTrinhPage } from '@/pages/QuyTrinhPage'
import { WorkshopPage } from '@/pages/WorkshopPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

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
        <Route path="khoa-hoc/workshop-ai" element={<WorkshopPage />} />
        <Route path="bang-gia" element={<PricingPage />} />
        {/* Path lạ (qua 404.html fallback) -> trang 404 riêng, KHÔNG phải trang chủ:
            hiện trang chủ ở URL sai khiến khách tưởng mình vào đúng chỗ */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Demo sống + trang quy trình dùng shell riêng — không Header/Footer chính */}
      <Route path="mau-tham-khao/:slug" element={<DemoScreen />} />
      <Route path="quy-trinh" element={<QuyTrinhPage />} />
    </Routes>
  )
}

export default App
