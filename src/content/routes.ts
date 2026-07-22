import { SITE } from './site'

// Single source of truth cho: prerender loop, sitemap generator, canonical/OG per page,
// và document.title khi điều hướng client-side (Layout).
export interface RouteMeta {
  path: string
  title: string
  description: string
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'LDK Tech — Thiết kế Website, App & Zalo Mini App cho SME',
    description:
      'Thiết kế website chuẩn SEO, web app, mobile app và Zalo Mini App cho hộ kinh doanh & SME. Giá minh bạch, bàn giao đúng hẹn, bảo hành 6 tháng.',
  },
  {
    path: '/dich-vu/',
    title: 'Dịch vụ của LDK Tech — Website, Web App, App & Mini App',
    description:
      'Bốn dịch vụ đưa việc kinh doanh lên online: thiết kế website, web app quản lý, mobile app và Zalo Mini App. Giá minh bạch, bàn giao đúng hẹn.',
  },
  ...SITE.servicePages.map((page) => ({
    path: `/dich-vu/${page.slug}/`,
    title: page.seoTitle,
    description: page.seoDesc,
  })),
  {
    path: '/du-an/',
    title: 'Dự án đã làm — 180+ sản phẩm từ 2012 | LDK Tech',
    description:
      'Dự án tiêu biểu đã bàn giao: sàn TMĐT nông sản, nền tảng du lịch, web app bất động sản, e-commerce Anh–Pháp, fintech Singapore. Review thật từ khách hàng.',
  },
  {
    path: '/bang-gia/',
    title: 'Bảng giá thiết kế website, app, Zalo Mini App 2026',
    description:
      'Bảng giá chi tiết từng dịch vụ: website từ 5 triệu, Zalo Mini App từ 15 triệu, web app từ 25 triệu, mobile app từ 40 triệu. Chốt giá trước khi làm.',
  },
]
