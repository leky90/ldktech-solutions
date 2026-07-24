# Áp phong cách B (editorial "thở") cho 7 trang dịch vụ

## Bối cảnh

`/bang-gia/` đã chuyển sang phong cách B và nhìn thoáng hơn hẳn 7 trang `/dich-vu/<slug>/`,
trong khi trang dịch vụ mới là cửa ngõ SEO chính. Trang dịch vụ hiện dùng nền xen kẽ
(`bg-secondary` / `bg-blueprint` / trắng) cộng viền `border-t-2 border-ink` giữa **mọi** mục,
nên trang bị chia thành các khối nặng, chật.

## Đặc trưng phong cách B (rút từ `/bang-gia/`)

1. Đường kẻ mảnh `border-t border-ink/20` thay viền đen 2px giữa các mục.
2. Nền trắng xuyên suốt; chỉ giữ **rất ít** dải màu để nhấn.
3. Nhịp dọc rộng hơn: `py-16 md:py-24` thay `py-14 md:py-20`.
4. Bố cục lệch 3/9: cột nhãn kiểu mục lục tạp chí bên trái, nội dung bên phải.

## Quyết định thiết kế

**Nhãn mục dùng CHỮ, không dùng số.** Trên `/bang-gia/` số `01`–`07` đánh dấu một danh sách
7 dịch vụ có thật nên số mang thông tin. Các mục trong một trang dịch vụ không phải một
chuỗi có thứ tự — đánh số ở đó chỉ là trang trí. Dùng nhãn chữ (`Vấn đề`, `Phạm vi`, `Giá`…)
vừa giữ đúng nhịp thị giác vừa nói thêm được nội dung.

**Tỷ lệ 3/9 cho mọi mục.** Đây là tỷ lệ đã chạy thật trên `/bang-gia/`: cột nội dung rộng
~824px đủ cho 3 `TierCard` mà không vỡ chữ giá (lỗi đã sửa ở `a9a148b`). Đổi tỷ lệ theo từng
mục sẽ làm mép cột nội dung nhảy và có nguy cơ tái hiện lỗi cắt chữ giá.
Hệ quả: `intro` ở cột nhãn phải NGẮN (≤ ~90 ký tự); đoạn giải thích dài đặt ở cột nội dung.

**Tiêu đề mục rút gọn, từ khoá dời xuống `intro`.** Cột nhãn chỉ rộng ~250px nên
"Câu hỏi thường gặp về Zalo Mini App" sẽ vỡ 5 dòng. Rút còn "Câu hỏi thường gặp" và đưa tên
dịch vụ vào câu `intro` ngay dưới — vừa gọn vừa không mất từ khoá khỏi trang.

## Phạm vi

- Component dùng chung `EditorialSection` (nhãn mono + h2 + intro + aside | nội dung).
- `PricingPage` chuyển sang dùng chung component đó — nguồn của phong cách phải là một chỗ,
  nếu không hai trang sẽ trôi khỏi nhau. Số `01`–`07` chuyển từ nằm cùng dòng với tiêu đề
  sang xếp trên tiêu đề, đồng bộ với vị trí nhãn chữ ở trang dịch vụ.
- `ServicePage`: 7 mục (vấn đề, phạm vi, mẫu, giá, cách làm, hỏi đáp, bằng chứng) dùng
  `EditorialSection`.
- Dải màu giữ lại: mục giá `bg-secondary` (đích của neo `#gia`), khối workshop
  `bg-gold-soft/40`, CTA chốt `bg-ink`. Còn lại nền trắng.

## Ràng buộc kế thừa (test cũ phải vẫn xanh)

- Đúng 1 thẻ `h1`/trang; JSON-LD `FAQPage`; chuỗi `triệu` và `hay được đặt` còn trên trang.
- SĐT/`zalo.me` không nằm trong HTML tĩnh, mặt nạ `09••` có mặt.
- Không jargon (`Lighthouse`, `React Native`, `TypeScript`…), không từ cấm về định vị.
- Không tràn chữ / cuộn ngang ở 375 · 768 · 1280.
