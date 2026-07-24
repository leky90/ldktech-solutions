// Nguồn duy nhất cho ảnh chia sẻ (OG). Dùng ở 3 nơi và phải khớp nhau tuyệt đối:
//   1. content/routes.ts  — gắn ogImage vào manifest
//   2. scripts/prerender.mjs — ghi thẻ og:image/twitter:image vào từng trang tĩnh
//   3. scripts/og-images.mjs — vẽ đúng file PNG đó ra dist/og/
// Lệch một chỗ là khách share link lên Zalo ra ảnh vỡ, nên tách hàm thuần để test được.

/** Kích thước thẻ chia sẻ chuẩn của Zalo / Facebook / Twitter */
export const OG_SIZE = { width: 1200, height: 630 } as const

/** '/dich-vu/zalo-mini-app/' → '/og/dich-vu-zalo-mini-app.png' · '/' → '/og/home.png' */
export function ogImagePath(routePath: string): string {
  const slug = routePath.replace(/^\/+|\/+$/g, '').replace(/\//g, '-')
  return `/og/${slug || 'home'}.png`
}

// Nhãn nhóm in phía trên tiêu đề trên thẻ — cho người xem biết ngay đang mở mục nào
const EYEBROWS: readonly (readonly [string, string])[] = [
  ['/dich-vu/', 'Dịch vụ'],
  ['/giai-phap/', 'Giải pháp theo ngành'],
  ['/du-an/', 'Dự án đã làm'],
  ['/mau-tham-khao/', 'Mẫu tham khảo'],
  ['/quy-trinh/', 'Quy trình làm việc'],
  ['/khoa-hoc/', 'Khoá học'],
  ['/bang-gia/', 'Bảng giá'],
]

/** Trang chủ và trang lỗi không thuộc nhóm nào — nói thẳng phục vụ ai, vì logo "LDK Tech"
 *  đã nằm ngay phía trên nên nhắc lại tên thương hiệu ở đây là phí chỗ. */
const DEFAULT_EYEBROW = 'Phần mềm cho hộ kinh doanh & SME'

export function ogEyebrow(routePath: string): string {
  return EYEBROWS.find(([prefix]) => routePath.startsWith(prefix))?.[1] ?? DEFAULT_EYEBROW
}

/** Tiêu đề SEO đã gánh tên thương hiệu; trên thẻ đã có logo nên bỏ đuôi/đầu "LDK Tech"
 *  để dành chỗ cho phần thông tin thật. Chỉ cắt ở hai đầu — nằm giữa câu là một phần nội dung. */
export function ogHeadline(title: string): string {
  return title
    .replace(/^LDK Tech\s*[—–-]\s*/, '')
    .replace(/\s*[|—–-]\s*LDK Tech$/, '')
    .trim()
}
