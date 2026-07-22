# LDK Tech Solutions — Landing Page

Landing page giới thiệu dịch vụ **Website / Web App / Mobile App / Zalo Mini App** cho hộ kinh doanh & SME.
Phong cách: editorial-tech / Neo-Swiss + soft brutalism + creative coding. Tiếng Việt, chuẩn SEO, tối ưu lead qua **Zalo**.

**Live:** https://leky90.github.io/ldktech-solutions/

## Tech stack

- React 19 + Vite 8 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (radix)
- Fonts self-host qua @fontsource (đều có subset tiếng Việt): Archivo Variable (display, trục width), Be Vietnam Pro (body), IBM Plex Mono (labels)
- Static + prerender riêng (`scripts/prerender.mjs`) → HTML đầy đủ cho SEO, client hydrate
- Deploy GitHub Pages qua GitHub Actions (`.github/workflows/deploy.yml`)

## Lệnh

```bash
pnpm dev        # dev server (mở http://localhost:5173/ldktech-solutions/)
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

## Chuyển sang tên miền riêng (khi có)

1. `vite.config.ts`: đổi `base: '/ldktech-solutions/'` → `'/'`
2. `src/content/site.ts`: đổi `siteUrl`
3. `index.html`: thay các URL `https://leky90.github.io/ldktech-solutions/` (canonical, og:url, og:image, JSON-LD)
4. `public/robots.txt` + `public/sitemap.xml`: thay URL
5. Thêm file `public/CNAME` chứa tên miền, trỏ DNS và khai báo trong Settings → Pages

## Cấu trúc

```
index.html                  # SEO head tĩnh: meta, OG, JSON-LD (ProfessionalService + FAQPage)
scripts/prerender.mjs       # render App -> HTML tĩnh sau khi build
src/
  content/site.ts           # TOÀN BỘ nội dung + config
  components/sections/      # Header, Hero, Marquee, Services, WhyUs, Process, Pricing, Faq, Contact, Footer
  components/shared/        # Logo, CtaLink, SectionHeading, Reveal, HeroCanvas, StickyMobileCta, FloatingZalo
  components/ui/            # shadcn/ui
public/                     # favicon, og-image, robots.txt, sitemap.xml
```
