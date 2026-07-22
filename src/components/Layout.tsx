import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { StickyMobileCta } from '@/components/shared/StickyMobileCta'
import { FloatingZalo } from '@/components/shared/FloatingZalo'
import { ROUTES } from '@/content/routes'

/** Khi đổi trang client-side: cuộn đúng chỗ + cập nhật title/description theo manifest */
function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  useEffect(() => {
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
    const route = ROUTES.find((r) => r.path === normalized)
    if (route) {
      document.title = route.title
      document.querySelector('meta[name="description"]')?.setAttribute('content', route.description)
    }
  }, [pathname])

  return null
}

export function Layout() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCta />
      <FloatingZalo />
    </>
  )
}
