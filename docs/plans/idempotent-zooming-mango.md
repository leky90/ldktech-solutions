# Kế hoạch: Mở rộng one-page → multi-page (SEO + lead sâu hơn)

> Kế hoạch trước (dựng landing one-page) đã hoàn thành & deploy — xem git history của file này.

## Context

Site hiện tại là one-page: mọi keyword phải cạnh tranh trên 1 URL duy nhất, không có trang chuyên sâu cho từng dịch vụ, bảng giá gộp 3 gói chung. Mở rộng multi-page để: mỗi dịch vụ có trang riêng + **bảng giá riêng** + FAQ riêng (JSON-LD riêng), trang dự án riêng, sitemap nhiều URL — giữ nguyên stack Vite + React static trên GitHub Pages.

## Chốt naming (theo tư vấn đã trả lời user)

- Nav chính giữ **"Dịch vụ"** (khớp search intent tệp hộ kinh doanh/SME). Layer **"Giải pháp theo ngành"** (spa, F&B, bán lẻ…) để Phase 2 — đây mới là chỗ dùng chữ "Giải pháp".
- Listing giữ **"Dự án"**; trang chi tiết có số liệu kết quả + permission của khách → nâng thành **case study** ("Câu chuyện khách hàng"). KHÔNG dùng "User stories" (thuật ngữ Agile, không phải marketing).
- **"Mẫu tham khảo"** (gallery tự dựng theo ngành) → Phase 3.

## Kiến trúc kỹ thuật

- **react-router v7**: client `BrowserRouter` với `basename` từ `import.meta.env.BASE_URL`; prerender dùng `StaticRouter` per route.
- **Routes manifest** `src/content/routes.ts`: `{ path, title, description }` cho từng trang — single source of truth cho (a) prerender loop, (b) sitemap generator, (c) rewrite canonical/OG per page.
- **`scripts/prerender.mjs` mở rộng**: loop qua manifest → render từng route → thay `<title>`, meta description, canonical, `og:url/title/description` trong template → ghi `dist/<path>/index.html`. Đồng thời **generate `dist/sitemap.xml`** từ manifest (xóa `public/sitemap.xml` tĩnh). GH Pages serve folder thật → deep link ra HTML thật; `404.html` vẫn copy root.
- **Layout** (`src/components/Layout.tsx`): Header + Footer + StickyMobileCta + FloatingZalo bọc `<Outlet/>`. Nav items thành route links (active state); các anchor nội bộ home giữ nguyên.
- **JSON-LD FAQPage per trang dịch vụ**: render `<script type="application/ld+json">` trong page component từ data `site.ts` (Google đọc được trong body; prerender xuất tĩnh) → hết cảnh duplicate FAQ ở 2 nơi. `Organization` giữ trong `index.html` head. Gỡ FAQPage tĩnh khỏi `index.html` (FAQ chung của home render từ component).

## Trang & nội dung — Phase 1 (làm ngay)

| Route | Nội dung |
|---|---|
| `/` | Home rút gọn: Hero (giữ), Marquee, Services tóm tắt (card → link trang chi tiết), 3 dự án nổi bật + link `/du-an/`, Process, Pricing teaser → `/bang-gia/`, FAQ chung, Contact |
| `/dich-vu/` | Tổng quan 4 dịch vụ |
| `/dich-vu/thiet-ke-website/` | Trang dịch vụ đầy đủ (template chung) |
| `/dich-vu/zalo-mini-app/` | — trang SEO chủ lực, keyword đang lên |
| `/dich-vu/web-app/` | |
| `/dich-vu/mobile-app/` | |
| `/du-an/` | 6 dự án + review khách (chuyển từ section) |
| `/bang-gia/` | Bảng so sánh giá 4 dịch vụ + link từng trang |

**Template trang dịch vụ**: hero riêng → pain points ("Bạn có đang…") → tính năng → **bảng giá riêng 3 mức** → quy trình rút gọn → FAQ riêng 4–5 câu (+ JSON-LD) → dự án liên quan → CTA Zalo.

**Bảng giá riêng per dịch vụ** (từ khảo sát thị trường đã làm ở turn trước):

- Website: Landing page **5tr** / Web giới thiệu **8tr** / Web bán hàng **từ 15tr**
- Zalo Mini App: Hiện diện + thành viên **15tr** / Bán hàng + đặt lịch **25tr** / Tích hợp CRM–ZNS **từ 35tr**
- Web App: MVP **từ 25tr** / Hệ quản lý đầy đủ **từ 45tr** / Theo yêu cầu
- Mobile App: MVP **từ 40tr** / Bản đầy đủ **từ 70tr** / Theo yêu cầu

**Data model**: mở rộng `src/content/site.ts` với `servicePages[]` (slug, seoTitle, seoDesc, hero, painPoints[], features[], tiers[], faqs[], relatedProjects[]) — tái dùng interfaces `PricingTier`, `Faq`, pattern data-driven hiện có. Tái dùng components: `SectionHeading`, `CtaLink`, `Reveal`, card patterns từ `Services.tsx`/`Pricing.tsx`/`Portfolio.tsx`.

## Phase 2 (sau khi P1 live — cần input thêm từ user)

- `/du-an/<slug>/` — 6 trang chi tiết dự án; nâng FoodMap/Treehouse thành case study khi có số liệu & permission khách.
- `/giai-phap/<nganh>/` — landing ngành: `spa-lam-dep`, `quan-an-cafe`, `cua-hang-ban-le` (long-tail SEO, pattern digibird đã validate).

## Phase 3

- `/mau-tham-khao/` — gallery 6–12 mẫu giao diện TỰ DỰNG theo ngành, mỗi mẫu 1 demo sống. Khác biệt vs digibird (họ đẩy no-code platform).

## Tests (TDD — viết RED trước)

- Manifest: mọi route có title/description duy nhất, title ≤ 60 chars, description ≤ 160 chars.
- Prerender từng route: đúng 1 `<h1>`, chứa canonical đúng của route đó.
- Trang dịch vụ: có bảng giá riêng (≥3 tiers), FAQ ≥ 3, có JSON-LD FAQPage.
- Sitemap: đủ 8 URL khớp manifest.
- Giữ toàn bộ test hiện có (jargon guard, live region, social proof…).

## Các bước thực hiện

1. Viết test RED: routes manifest + multi-page prerender + service page content.
2. `pnpm add react-router` (v7); tạo `src/content/routes.ts`, `src/components/Layout.tsx`; tách `App.tsx` → `src/pages/Home.tsx` + router config.
3. Mở rộng `scripts/prerender.mjs`: loop routes, rewrite head per route, generate sitemap; xóa `public/sitemap.xml`; cập nhật build script nếu cần.
4. Viết content `servicePages` trong `site.ts` (4 dịch vụ: copy bán hàng + giá riêng + FAQ riêng).
5. `src/pages/ServicePage.tsx` (template) + `ServicesIndex.tsx` + `PricingPage.tsx` + `ProjectsPage.tsx`.
6. Home rút gọn + Header nav route links (active state) + Footer links.
7. FAQPage JSON-LD per page; gỡ FAQPage khỏi `index.html`.
8. `pnpm build` → verify dist: folder mỗi route, canonical riêng, sitemap 8 URL.
9. Visual pass 375/768/1280 các trang mới; commit theo behaviour; push; verify live.

## Verification

- `pnpm test` xanh toàn bộ (test cũ + mới).
- `dist/` có folder từng route với `index.html` chứa nội dung render sẵn + canonical/OG đúng URL riêng; `dist/sitemap.xml` đủ 8 URL.
- Sau deploy: curl từng URL live (200 + đúng title), check 2 route bằng view-source; ghi chú user nên submit sitemap trong Google Search Console.
