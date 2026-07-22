import { Route, Routes } from 'react-router'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { ServicesIndex } from '@/pages/ServicesIndex'
import { ServicePage } from '@/pages/ServicePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { PricingPage } from '@/pages/PricingPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dich-vu" element={<ServicesIndex />} />
        <Route path="dich-vu/:slug" element={<ServicePage />} />
        <Route path="du-an" element={<ProjectsPage />} />
        <Route path="bang-gia" element={<PricingPage />} />
        {/* Path lạ (qua 404.html fallback) -> về trang chủ */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
