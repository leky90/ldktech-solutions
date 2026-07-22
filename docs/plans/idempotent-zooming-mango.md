# Kế hoạch: Landing page LDK Tech Solutions

## Context

Xây landing page một trang (tiếng Việt) giới thiệu dịch vụ xây dựng **Website / Web App / Mobile App / Zalo Mini App** cho **hộ kinh doanh cá nhân và SME**. Mục tiêu: chuẩn SEO, UX rõ ràng, tối ưu lead & chốt sale. Thư mục dự án hiện trống (greenfield).

- **Phong cách**: editorial-tech / Neo-Swiss hiện đại + soft brutalism (viền đậm, hard shadow lệch, badge sticker) + creative coding (canvas generative, marquee, mono labels, section đánh số 01–04).
- **Màu**: nền trắng chủ đạo; Primary Purple `#6F3CC3`, Dark Purple `#4B2A84`, Golden Yellow `#F4B400`, Soft Gold `#FFD166`, Midnight Ink `#211A3B` (text), White `#FFFFFF`. Logo chữ K trong vòng tròn → vẽ lại bằng inline SVG (dùng làm logo header + favicon).
- **Stack**: React + Vite + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (button, accordion, input, textarea, sheet), alias `@/*`. Static, deploy GitHub Pages qua GitHub Actions.

## Quyết định kỹ thuật chính

| Vấn đề | Quyết định | Lý do |
|---|---|---|
| SEO/prerender cho Vite SPA | **`vite-prerender-plugin`** — export `prerender()` từ `main.tsx` dùng `renderToString`, client `hydrateRoot`. Meta/OG/JSON-LD viết tĩnh 100% trong `index.html` (belt & suspenders) | Mình tự own render call nên an toàn với React 19; `vite-react-ssg` còn ghi "Support react19" trong roadmap, `react-snap` đã chết. Fallback: nếu prerender kẹt với code browser-only thì vẫn còn full meta tĩnh |
| Fonts (bắt buộc hỗ trợ dấu tiếng Việt) | **Space Grotesk** (display) + **Be Vietnam Pro** (body) + **IBM Plex Mono** (labels/số), self-host qua `@fontsource` | Cả 3 đều có subset `vietnamese` (đã verify). Guardrail: heading `leading` ≥ 1.15, không `overflow:hidden` trên container heading để không cắt dấu (ậ, ệ, ổ) |
| Lead form không backend | **Web3Forms** (250 sub/tháng free, key public-safe, honeypot `botcheck`). Ship với placeholder key; nếu key chưa thay → form tự chuyển sang panel "Nhắn Zalo / Gọi ngay" | Không bao giờ dead-end; mailto-only bị loại vì đa số điện thoại SME VN không cấu hình mail client |
| Animation | **Không** dùng framer-motion/`motion`. Canvas thuần + CSS keyframes + IntersectionObserver | Đối tượng dùng Android tầm trung/4G; giữ JS < ~120 kb gzip |
| Conversion chính | **Chat Zalo** (`zalo.me/…`) là primary CTA; form là secondary; `tel:` là tertiary | Zalo là kênh mặc định của hộ kinh doanh/SME VN — friction thấp nhất |

## Wireframe & luồng conversion (thứ tự section)

1. **Header** — sticky, logo K + anchor nav (Dịch vụ / Quy trình / Bảng giá / FAQ) + nút "Nhận báo giá"; mobile dùng Sheet.
2. **Hero** — H1 value prop lớn kiểu editorial, sub, CTA đôi ("Chat Zalo ngay" primary vàng + "Xem bảng giá" secondary), trust line; nền canvas dot-grid generative (tím/vàng, pointer repulsion, tắt khi `prefers-reduced-motion`).
3. **Marquee strip** — ticker CSS-only: dịch vụ/tech stack.
4. **Dịch vụ (01–04)** — 4 card lớn: Website / Web App / Mobile App / Zalo Mini App; mỗi card: mô tả, "phù hợp với", giá "từ…", mini-CTA.
5. **Vì sao chọn LDK** — grid Neo-Swiss đánh số: giá minh bạch, bàn giao nhanh, hỗ trợ 1-1, bảo hành, chuẩn SEO/tốc độ.
6. **Quy trình** — 4 bước: Tư vấn → Báo giá → Thiết kế & phát triển → Bàn giao & bảo hành (xây trust với SME ngại agency).
7. **Bảng giá tham khảo** — 3 gói "từ X triệu" + CTA "Nhận báo giá chi tiết" (minh bạch giá = yếu tố chốt của tệp này).
8. **FAQ** — accordion 5–6 câu, khớp với FAQPage JSON-LD.
9. **Liên hệ / Lead form** — form Web3Forms + khối Zalo + `tel:` cạnh nhau, headline chốt sale.
10. **Footer** — thông tin liên hệ, mini sitemap.

Xuyên suốt: CTA lặp ở header, hero, sau services, pricing, cuối trang. **Mobile < 768px**: sticky bottom bar 2 nút ("Chat Zalo" vàng + "Gọi ngay"), tự ẩn khi section Liên hệ đang trong viewport. Desktop: bubble Zalo nổi góc phải dưới.

## Cấu trúc file

```
index.html                     # lang=vi, title/description, OG/Twitter, canonical, JSON-LD (ProfessionalService + FAQPage)
src/
  main.tsx                     # hydrateRoot + export async prerender()
  App.tsx                      # ghép các section theo thứ tự
  index.css                    # @import "tailwindcss"; @theme tokens màu/font; shadcn vars
  content/site.ts              # TOÀN BỘ copy tiếng Việt + config: SITE_URL, ZALO_URL, PHONE, form key, services[], steps[], pricing[], faqs[]
  components/
    ui/                        # shadcn: button, accordion, input, textarea, sheet
    sections/                  # Header, Hero, Marquee, Services, WhyUs, Process, Pricing, Faq, Contact, Footer (mỗi file 1 component)
    shared/                    # Logo.tsx (SVG K), SectionHeading.tsx, HeroCanvas.tsx, StickyMobileCta.tsx, FloatingZalo.tsx
  lib/utils.ts, lib/useReveal.ts
public/                        # robots.txt, sitemap.xml, og-image, favicon.svg
.github/workflows/deploy.yml
```

Design tokens đặt trong `@theme` của `index.css` (Tailwind v4 CSS-first): `--color-primary #6F3CC3`, `--color-primary-deep #4B2A84`, `--color-gold #F4B400`, `--color-gold-soft #FFD166`, `--color-ink #211A3B` + `--font-display/sans/mono`; map shadcn semantic vars lên palette. Copy hoàn toàn data-driven từ `site.ts`.

## Các bước thực hiện

1. Scaffold `pnpm create vite@latest` (react-ts) vào thư mục tạm → merge vào root (giữ `.claude/`, `docs/`) → `pnpm install`, set `packageManager`.
2. Cài Tailwind v4 + `@tailwindcss/vite`; viết `@theme` tokens; set `base: '/ldktech-solutions/'`, alias `@/*` ở `vite.config.ts` + cả 2 tsconfig.
3. Cài @fontsource (space-grotesk variable, be-vietnam-pro 400/500/700, ibm-plex-mono 400/500), import trong `main.tsx`.
4. `pnpm dlx shadcn@latest init` + add button, accordion, input, textarea, sheet; map màu.
5. Viết `index.html` head đầy đủ SEO + favicon SVG logo K.
6. Viết `src/content/site.ts` — toàn bộ copy tiếng Việt thật (không lorem) + placeholder liên hệ.
7. Shared components: Logo, SectionHeading, useReveal, StickyMobileCta, FloatingZalo.
8. Header + Hero (HeroCanvas + reduced-motion fallback) → check 3 breakpoint.
9. Marquee, Services, WhyUs → check responsive.
10. Process, Pricing, FAQ → check responsive.
11. Contact (form Web3Forms + honeypot + fallback panel) + Footer.
12. Thêm `vite-prerender-plugin`, verify `dist/index.html` có nội dung render sẵn.
13. `robots.txt`, `sitemap.xml`, og-image; postbuild copy `404.html`.
14. `git init` + tạo **repo public `ldky90/ldktech-solutions`** qua `gh` + workflow `deploy.yml` (pnpm → build → actions/deploy-pages) + bật Pages source = GitHub Actions → push → verify site live.
15. Chạy checklist verification + viết README handoff.

## Verification

- Dev server (browser pane): pass visual ở **375 / 768 / 1280**; dấu tiếng Việt không bị cắt; sticky CTA + Sheet nav hoạt động.
- `pnpm build` → `dist/index.html` có nội dung section render sẵn, meta/OG/canonical/JSON-LD nguyên vẹn, có `404.html`; `pnpm preview` smoke test với base path.
- Perf/a11y: LCP là H1 text (không hero image), JS < ~120 kb gzip, tap target ≥ 44px, contrast đạt (chữ ink trên nền vàng, không dùng chữ vàng trên nền trắng), `prefers-reduced-motion` được tôn trọng, 1 H1 duy nhất.
- Sau deploy: mở URL GH Pages thật, check meta bằng view-source.

## Giả định & placeholder (bạn sửa sau, không chặn tiến độ)

- Repo: **public** `ldky90/ldktech-solutions` → URL `https://ldky90.github.io/ldktech-solutions/` (GH Pages free yêu cầu repo public). Nếu sau này có custom domain: đổi `base: '/'`, `SITE_URL`, thêm `public/CNAME` — đã centralize nên chỉ ~4 dòng.
- Zalo/SĐT/email: dùng placeholder trong `site.ts`, thay 1 chỗ.
- Web3Forms key: placeholder; kích hoạt bằng cách lấy key free tại web3forms.com (nhập email nhận lead) rồi dán vào `site.ts`.
- Giá các gói: tôi sẽ đặt mức tham khảo hợp lý thị trường VN (ví dụ landing page từ 3–5tr, website từ 8tr, mini app từ 15tr…) — bạn chỉnh lại theo giá thật.
