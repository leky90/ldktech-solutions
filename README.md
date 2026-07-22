# LDK Tech Solutions — Landing Page

Landing page giới thiệu dịch vụ **Website / Web App / Mobile App / Zalo Mini App** cho hộ kinh doanh & SME.
Phong cách: editorial-tech / Neo-Swiss + soft brutalism + creative coding. Tiếng Việt, chuẩn SEO, tối ưu lead qua **Zalo**.

**Live:** https://ldktech.com/

## Tech stack

- React 19 + Vite 8 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (radix)
- Fonts self-host qua @fontsource (đều có subset tiếng Việt): Archivo Variable (display, trục width), Be Vietnam Pro (body), IBM Plex Mono (labels)
- Static + prerender riêng (`scripts/prerender.mjs`) → HTML đầy đủ cho SEO, client hydrate
- Deploy GitHub Pages qua GitHub Actions (`.github/workflows/deploy.yml`)

## Lệnh

```bash
pnpm dev        # dev server (mở http://localhost:5173/)
pnpm test       # vitest — kiểm tra prerender + tính toàn vẹn nội dung
pnpm build      # build + prerender + tạo 404.html
pnpm preview    # xem thử bản build
```

## Sửa nội dung — 1 file duy nhất

Toàn bộ copy + cấu hình nằm ở **`src/content/site.ts`**:

| Việc cần làm | Sửa ở đâu |
|---|---|
| Số Zalo / SĐT / email | `zaloUrl`, `phone`, `phoneHref`, `email` |
| **Kích hoạt form lead** | Điền URL API tự host vào `leadApiUrl`. Form POST JSON `{source, name, phone, message}`; trả 2xx = thành công. Để trống thì form tự ẩn, chỉ hiện nút Zalo/gọi |
| Giá các gói | `pricing[]`, `services[].from` |
| Số liệu trust (30+ dự án…) | `hero.trust` |
| FAQ | `faqs[]` — **lưu ý**: sửa FAQ thì sửa cả JSON-LD FAQPage trong `index.html` cho khớp |

SEO meta (title/description/OG/canonical/JSON-LD) nằm tĩnh trong **`index.html`**.

## Tên miền

Đã chạy trên **ldktech.com** (Cloudflare DNS → GitHub Pages):
- Cloudflare: `ldktech.com` và `www` CNAME → `leky90.github.io`, **DNS only** (bắt buộc để GitHub cấp SSL)
- GitHub Pages: custom domain `ldktech.com` (Settings → Pages), `public/CNAME`
- URL cũ `leky90.github.io/ldktech-solutions/*` tự 301 về domain mới

**Rollback DNS (nếu cần quay lại site cũ):** đổi 2 record trên về Cloudflare Tunnel như cũ —
apex → `a8e6adb2-09e5-460b-9b2e-c0a277b4d2ee.cfargotunnel.com` (Proxied),
www → `fe284192-c712-4932-aa4a-40390b843568.cfargotunnel.com` (Proxied).

## Cấu trúc (multi-page)

8 trang tĩnh, mỗi trang có title/canonical/OG riêng: `/`, `/dich-vu/` + 4 trang dịch vụ
(bảng giá + FAQ riêng từng dịch vụ), `/du-an/`, `/bang-gia/`. Sitemap generate tự động từ manifest.

```
index.html                  # SEO head template: meta, OG, JSON-LD Organization
scripts/prerender.mjs       # loop routes -> dist/<path>/index.html + sitemap.xml
src/
  content/site.ts           # TOÀN BỘ nội dung + config (servicePages = 4 trang dịch vụ)
  content/routes.ts         # manifest route: path + title + description (nguồn duy nhất)
  pages/                    # Home, ServicesIndex, ServicePage, ProjectsPage, PricingPage
  components/Layout.tsx     # Header/Footer/CTA bọc Outlet + title per route
  components/sections/      # các section trang chủ
  components/shared/        # Logo, CtaLink, TierCard, ProjectCard, PageHero, JsonLd…
  components/ui/            # shadcn/ui
public/                     # favicon, og-image, robots.txt
```

**Thêm trang mới**: thêm entry vào `routes.ts` + `<Route>` trong `App.tsx` — prerender và sitemap tự theo.
