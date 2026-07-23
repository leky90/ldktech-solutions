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
    title: 'Dịch vụ của LDK Tech — Website, App, AI & Tự động hoá',
    description:
      'Bảy dịch vụ cho việc kinh doanh online: website, web app, mobile app, Zalo Mini App, trợ lý AI, tự động hoá quy trình và chăm sóc website. Giá minh bạch.',
  },
  ...SITE.servicePages.map((page) => ({
    path: `/dich-vu/${page.slug}/`,
    title: page.seoTitle,
    description: page.seoDesc,
  })),
  {
    path: '/giai-phap/',
    title: 'Giải pháp theo ngành: spa, quán ăn, cửa hàng bán lẻ',
    description:
      'Bộ giải pháp trọn gói theo ngành: spa & làm đẹp, quán ăn & cà phê, cửa hàng bán lẻ — website, mini app và tự động hoá phối hợp để ra đơn và giữ khách quen.',
  },
  ...SITE.industryPages.map((page) => ({
    path: `/giai-phap/${page.slug}/`,
    title: page.seoTitle,
    description: page.seoDesc,
  })),
  {
    path: '/du-an/',
    title: 'Dự án đã làm — 180+ sản phẩm từ 2012 | LDK Tech',
    description:
      'Dự án tiêu biểu đã bàn giao: sàn TMĐT nông sản, nền tảng du lịch, web app bất động sản, e-commerce Anh–Pháp, fintech Singapore. Review thật từ khách hàng.',
  },
  ...SITE.projectDetails.map((detail) => ({
    path: `/du-an/${detail.slug}/`,
    title: detail.seoTitle,
    description: detail.seoDesc,
  })),
  {
    path: '/mau-tham-khao/',
    title: 'Mẫu website, app & Zalo Mini App — có demo xem thử',
    description:
      'Thư viện mẫu website, web app, mobile app và Zalo Mini App theo từng ngành — kèm demo tương tác bấm thử trực tiếp. Chọn mẫu, LDK làm theo thương hiệu của bạn.',
  },
  ...SITE.demoPages.map((demo) => ({
    path: `/mau-tham-khao/${demo.slug}/`,
    title: demo.seoTitle,
    description: demo.seoDesc,
  })),
  {
    path: '/quy-trinh/',
    title: SITE.processPage.seoTitle,
    description: SITE.processPage.seoDesc,
  },
  {
    path: '/bang-gia/',
    title: 'Bảng giá thiết kế website, app, Zalo Mini App 2026',
    description:
      'Bảng giá chi tiết từng dịch vụ: website từ 5 triệu, Zalo Mini App từ 15 triệu, web app từ 25 triệu, mobile app từ 40 triệu. Chốt giá trước khi làm.',
  },
]
