# Kế hoạch: Phase 2 + 3 — Dự án chi tiết · Giải pháp ngành · Gallery mẫu + demo sống

> Kế hoạch trước (multi-page 11 trang) đã hoàn thành & deploy — xem git history của file này.
> User chốt 2026-07-23: làm Phase 2+3; hoãn case-study số liệu, footer pháp lý, blog/OA/GBP.

## Mục tiêu

1. **Phase 2a — `/du-an/<slug>/`**: 6 trang chi tiết dự án (FoodMap, Native, Build-to-Rent, Controllermodz, Ciga.fr, Treehouse). Nội dung ĐỊNH TÍNH từ dữ liệu đã có — **tuyệt đối không bịa số liệu kết quả** (số liệu thật + permission khách là hạng mục hoãn).
2. **Phase 2b — `/giai-phap/`**: index + 3 landing ngành `spa-lam-dep`, `quan-an-cafe`, `cua-hang-ban-le` — long-tail SEO, chữ "Giải pháp" dùng đúng chỗ đã chốt naming.
3. **Phase 3 — `/mau-tham-khao/`**: gallery gom toàn bộ mẫu từ `servicePages[].samples` + **3 demo sống tương tác**: mini app đặt lịch spa, website nhà hàng, gọi món QR tại bàn.

## Route mới (14 → tổng 25)

| Route | Ghi chú |
|---|---|
| `/du-an/foodmap|native|build-to-rent|controllermodz|ciga-fr|treehouse/` | từ `projectDetails[]` |
| `/giai-phap/` | index 3 ngành |
| `/giai-phap/spa-lam-dep|quan-an-cafe|cua-hang-ban-le/` | từ `industryPages[]`, FAQPage JSON-LD riêng |
| `/mau-tham-khao/` | gallery, lọc theo dịch vụ |
| `/mau-tham-khao/spa-dat-lich|website-nha-hang|goi-mon-qr/` | demo sống, DemoShell riêng (ngoài Layout) |

## Data model (site.ts)

- `Project` thêm `slug` (nối card → trang chi tiết).
- `projectDetails[]`: slug, name, seoTitle (≤60), seoDesc (50–160), h1, summary, context[] (bài toán), scope[] (phạm vi LDK đảm nhận), outcome[] (kết quả định tính), services[] (slug servicePages liên quan).
- `industryPages[]`: slug, nav, seoTitle, seoDesc, h1, intro, painPoints[≥3], solutions[] {title, desc, serviceSlug, from} (bộ dịch vụ đề xuất theo lộ trình), roadmap[] {stage, desc}, faqs[≥3], sampleTags[] (kéo mẫu liên quan), demoSlug?.
- `SampleTemplate` thêm `demo?: string` — card mẫu có demo hiện "Xem demo sống →" thay link Zalo.
- `demoPages[]`: slug, kind (mini-app|website|web-app), name (thương hiệu hư cấu), seoTitle, seoDesc, tagline. Nội dung demo nằm trong component (UI tương tác), data minh hoạ gắn nhãn rõ.
- `nav` thêm: Giải pháp `/giai-phap/`, Mẫu tham khảo `/mau-tham-khao/` (6 item).

## Demo sống — nguyên tắc

- Thương hiệu hư cấu, dữ liệu minh hoạ, có nhãn "Bản demo — dữ liệu minh hoạ" trong DemoShell.
- DemoShell (KHÔNG dùng Header/Footer chính): thanh trên cùng logo LDK + "Bản demo" + link quay lại gallery; thanh dưới CTA "Đặt mẫu này qua Zalo". RouteEffects tái dùng từ Layout (export).
- `DeviceFrame`: `PhoneFrame` (mini app / web app mobile) và `BrowserFrame` (website) — demo nằm trong khung thiết bị, tương tác bằng React state, không backend.
- 3 demo: **Spa "An Nhiên"** (mini app đặt lịch: chọn dịch vụ → chọn ngày giờ → xác nhận + thẻ thành viên); **Nhà hàng "Bếp Quê"** (website: menu, đặt bàn, bản đồ); **Cà phê "Hạt & Lá"** (web app gọi món QR: menu → giỏ → gửi món → trạng thái).
- Không chữ nào trong danh sách cấm (freelancer/vlance/upwork/studio) và jargon cấm.

## Ràng buộc kế thừa

- Title ≤60, desc 50–160, path `^\/([a-z0-9-]+\/)*$`, title/desc duy nhất toàn manifest.
- SĐT/zalo.me không xuất hiện trong HTML tĩnh (usePhone), 1 thẻ h1/trang.
- Prerender + sitemap tự nhận route mới từ manifest — không sửa scripts/prerender.mjs.

## Tests (RED trước — src/__tests__/phase2.test.tsx)

- Manifest ≥25 route, đủ 14 path mới, meta hợp chuẩn (kế thừa test cũ chạy trên toàn ROUTES).
- projectDetails: đủ 6, slug khớp portfolio, scope/outcome ≥2, services trỏ slug thật.
- industryPages: đủ 3, painPoints ≥3, faqs ≥3, solutions ≥2 trỏ serviceSlug thật.
- Prerender: /du-an/foodmap/ (1 h1, có tên + outcome); /giai-phap/spa-lam-dep/ (1 h1, FAQPage, 'triệu'); /mau-tham-khao/ (có mẫu + link demo); 3 trang demo (1 h1, nhãn minh hoạ, CTA Zalo mask).
- Ban positioning mở rộng sang trang mới.

## Verify

- `pnpm test` xanh toàn bộ; `pnpm build` ra dist đủ 25 folder + sitemap 25 URL.
- Visual 375/768/1280 các trang mới; commit theo behaviour (3 chu trình: dự án → ngành → gallery+demo); push; curl các URL live.
