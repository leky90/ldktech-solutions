// ============================================================
// TOÀN BỘ nội dung + cấu hình của landing page nằm ở file này.
// Đổi thông tin liên hệ / giá / copy: chỉ cần sửa ở đây.
// ============================================================

export interface Service {
  num: string
  title: string
  desc: string
  fit: string
  features: string[]
  from: string
  badge?: string
}

export interface ProcessStep {
  num: string
  title: string
  desc: string
}

export interface PricingTier {
  name: string
  price: string
  priceNote: string
  desc: string
  features: string[]
  highlight?: boolean
  cta: string
}

export interface Faq {
  q: string
  a: string
}

export const SITE = {
  name: 'LDK Tech Solutions',
  brand: 'LDK Tech',
  tagline: 'Thiết kế Website, App & Zalo Mini App cho hộ kinh doanh và SME',

  // ── URL & liên hệ — THAY BẰNG THÔNG TIN THẬT (1 chỗ duy nhất) ──
  siteUrl: 'https://leky90.github.io/ldktech-solutions/',
  zaloUrl: 'https://zalo.me/0900000000',
  phone: '0900 000 000',
  phoneHref: 'tel:+84900000000',
  email: 'hello@ldktech.vn',
  // Lấy key miễn phí tại https://web3forms.com (nhập email nhận lead).
  // Chưa thay key -> form tự chuyển sang panel "Nhắn Zalo / Gọi ngay".
  web3formsKey: 'YOUR_ACCESS_KEY_HERE',

  nav: [
    { label: 'Dịch vụ', href: '#dich-vu' },
    { label: 'Quy trình', href: '#quy-trinh' },
    { label: 'Bảng giá', href: '#bang-gia' },
    { label: 'FAQ', href: '#faq' },
  ],

  hero: {
    eyebrow: '~/ldk-tech · thiết kế & phát triển sản phẩm số',
    // H1 giữ đủ keyword SEO chính
    h1Lines: ['Website, App', '& Zalo Mini App', 'cho người kinh doanh.'],
    sub: 'Giá chốt trước khi làm. Bàn giao đúng hẹn. Trao đổi 100% qua Zalo bằng ngôn ngữ dễ hiểu. LDK Tech đồng hành cùng hộ kinh doanh & SME từ ý tưởng đến khi ra đơn hàng đầu tiên — và sau đó nữa.',
    ctaPrimary: 'Chat Zalo ngay',
    ctaSecondary: 'Xem bảng giá',
    trust: ['30+ dự án đã bàn giao', 'Phản hồi Zalo dưới 2 giờ', 'Bảo hành 6 tháng'],
  },

  marquee: [
    'Website chuẩn SEO',
    'Web App quản lý',
    'Mobile App iOS/Android',
    'Zalo Mini App',
    'Giá minh bạch',
    'Bàn giao đúng hẹn',
    'Bảo hành 6 tháng',
    'Công nghệ hiện đại',
  ],

  services: [
    {
      num: '01',
      title: 'Website giới thiệu & bán hàng',
      desc: 'Website chuẩn SEO, tải nhanh, tự quản lý nội dung. Khách Google là thấy, xem là tin, gọi là chốt.',
      fit: 'Quán ăn, spa, cửa hàng, dịch vụ địa phương, công ty cần "mặt tiền online".',
      features: ['Thiết kế theo thương hiệu riêng', 'Chuẩn SEO + Google Maps', 'Tối ưu mobile & tốc độ', 'Hướng dẫn tự cập nhật nội dung'],
      from: 'từ 4 triệu',
    },
    {
      num: '02',
      title: 'Web App quản lý & vận hành',
      desc: 'Phần mềm chạy trên trình duyệt, đo ni đóng giày cho quy trình của bạn: đơn hàng, kho, khách hàng, báo cáo.',
      fit: 'SME muốn bỏ Excel, chuỗi cửa hàng, xưởng sản xuất nhỏ.',
      features: ['Thiết kế theo quy trình thật', 'Phân quyền nhân viên', 'Báo cáo trực quan', 'Chạy mọi thiết bị, không cần cài'],
      from: 'từ 15 triệu',
    },
    {
      num: '03',
      title: 'Mobile App iOS & Android',
      desc: 'App cài trên điện thoại khách hàng — đặt lịch, tích điểm, nhận thông báo khuyến mãi. Một mã nguồn, chạy cả hai hệ.',
      fit: 'Thương hiệu muốn giữ chân khách quen: chuỗi F&B, phòng gym, salon.',
      features: ['Một app chạy cả iPhone & Android', 'Đặt lịch & tích điểm', 'Thông báo đẩy khuyến mãi', 'Đưa lên App Store & Google Play'],
      from: 'từ 25 triệu',
    },
    {
      num: '04',
      title: 'Zalo Mini App',
      desc: 'App chạy ngay trong Zalo — khách không cần cài gì thêm. Đặt hàng, đặt lịch, thẻ thành viên, ưu đãi: mở Zalo là xong.',
      fit: 'Hộ kinh doanh & SME có tệp khách Zalo — tức là gần như mọi khách hàng Việt.',
      features: ['Không cần cài đặt, mở là dùng', 'Chi phí thấp hơn app thường', 'Gắn với Zalo OA & tin nhắn ZNS', 'Đặt hàng / đặt lịch / thành viên'],
      from: 'từ 12 triệu',
      badge: 'Đáng đầu tư nhất',
    },
  ] satisfies Service[],

  whyUs: [
    { title: 'Giá chốt trước, không phát sinh', desc: 'Báo giá chi tiết từng hạng mục trước khi ký. Chỉ đổi khi bạn chủ động thêm yêu cầu — và phần thêm cũng báo giá trước.' },
    { title: 'Bàn giao đúng hẹn', desc: 'Tiến độ công khai theo tuần, cập nhật qua Zalo. Trễ hẹn do lỗi của LDK: giảm phí theo cam kết trong hợp đồng.' },
    { title: 'Nói tiếng người kinh doanh', desc: 'Không thuật ngữ khó hiểu. Tư vấn theo mục tiêu ra đơn của bạn, không vẽ vời tính năng thừa để tăng giá.' },
    { title: 'Chuẩn SEO & tốc độ', desc: 'Web đạt chuẩn tốc độ của Google — khách tìm là thấy bạn trước đối thủ, mở nhanh cả trên điện thoại sóng yếu.' },
    { title: 'Bảo hành & đồng hành', desc: '6 tháng bảo hành lỗi miễn phí. Gói chăm sóc dài hạn: cập nhật nội dung, sao lưu, nâng cấp khi cần.' },
    { title: 'Bạn sở hữu 100%', desc: 'Mã nguồn, tên miền, dữ liệu đều đứng tên bạn. Không bị "giữ chân" bởi bất kỳ nền tảng nào.' },
  ],

  process: [
    { num: '01', title: 'Tư vấn miễn phí', desc: '30–45 phút qua Zalo hoặc cà phê. Nghe mục tiêu kinh doanh, đề xuất phương án vừa túi tiền — chưa cần cam kết gì.' },
    { num: '02', title: 'Báo giá & kế hoạch', desc: 'Báo giá chi tiết từng hạng mục kèm mốc thời gian cụ thể. Bạn đồng ý thì mới bắt đầu.' },
    { num: '03', title: 'Thiết kế & phát triển', desc: 'Xem bản demo theo tuần, góp ý trực tiếp trên sản phẩm thật. Không phải đợi đến cuối mới thấy kết quả.' },
    { num: '04', title: 'Bàn giao & bảo hành', desc: 'Hướng dẫn sử dụng tận tay, tài liệu đầy đủ, bảo hành 6 tháng. Cần gì cứ nhắn Zalo.' },
  ] satisfies ProcessStep[],

  pricing: [
    {
      name: 'Khởi đầu',
      price: 'từ 4 triệu',
      priceNote: 'trọn gói',
      desc: 'Landing page hoặc website giới thiệu 1–5 trang. Mặt tiền online đầu tiên cho việc kinh doanh của bạn.',
      features: ['Thiết kế theo thương hiệu', 'Chuẩn SEO cơ bản', 'Form liên hệ + nút Zalo', 'Hướng dẫn hosting tiết kiệm', 'Bàn giao 7–10 ngày'],
      cta: 'Nhận báo giá chi tiết',
    },
    {
      name: 'Tăng trưởng',
      price: 'từ 12 triệu',
      priceNote: 'trọn gói',
      desc: 'Website đầy đủ hoặc Zalo Mini App: bán hàng, đặt lịch, quản lý nội dung — bắt đầu ra đơn từ kênh online.',
      features: ['Mọi thứ ở gói Khởi đầu', 'Bán hàng / đặt lịch online', 'Kết nối Zalo OA & thanh toán', 'Đào tạo sử dụng 1-1', 'Bàn giao 3–5 tuần'],
      highlight: true,
      cta: 'Nhận báo giá chi tiết',
    },
    {
      name: 'Theo yêu cầu',
      price: 'Báo giá riêng',
      priceNote: 'theo phạm vi',
      desc: 'Web App / Mobile App đo ni đóng giày theo quy trình vận hành riêng của doanh nghiệp bạn.',
      features: ['Phân tích quy trình miễn phí', 'Thiết kế UX riêng', 'Phát triển theo giai đoạn', 'Đồng hành dài hạn', 'Ưu tiên hỗ trợ 24/7'],
      cta: 'Đặt lịch tư vấn',
    },
  ] satisfies PricingTier[],

  pricingNote: 'Giá tham khảo để bạn dễ hình dung — con số chính xác chốt sau buổi tư vấn miễn phí, luôn chốt trước khi bắt đầu làm.',

  faqs: [
    {
      q: 'Tôi không rành công nghệ, làm việc thế nào?',
      a: 'Bạn chỉ cần kể về việc kinh doanh của mình — mọi thứ kỹ thuật LDK lo. Trao đổi hoàn toàn qua Zalo bằng ngôn ngữ dễ hiểu, có bản demo xem trực tiếp trên điện thoại của bạn trước khi chốt.',
    },
    {
      q: 'Chi phí tính thế nào, có phát sinh không?',
      a: 'Báo giá chi tiết từng hạng mục trước khi bắt đầu. Giá chỉ thay đổi khi bạn chủ động thêm yêu cầu mới, và phần thêm cũng được báo giá trước khi làm. Không có chi phí ẩn.',
    },
    {
      q: 'Bao lâu thì xong?',
      a: 'Landing page: 7–10 ngày. Website đầy đủ: 2–4 tuần. Zalo Mini App: 3–5 tuần. Web App / Mobile App: tùy phạm vi, có mốc thời gian cụ thể trong báo giá. Tiến độ cập nhật qua Zalo mỗi tuần.',
    },
    {
      q: 'Zalo Mini App khác gì app thường?',
      a: 'Zalo Mini App chạy ngay bên trong Zalo nên khách không cần tải hay cài gì thêm — mở Zalo là dùng được. Chi phí thấp hơn app native đáng kể và tận dụng được tệp khách Zalo sẵn có, rất phù hợp với hộ kinh doanh và SME.',
    },
    {
      q: 'Sau khi bàn giao có được hỗ trợ không?',
      a: 'Có. Mọi sản phẩm được bảo hành lỗi miễn phí 6 tháng. Nếu cần, có thêm gói chăm sóc dài hạn: cập nhật nội dung, sao lưu định kỳ, nâng cấp tính năng — chi phí công khai từ đầu.',
    },
    {
      q: 'Tôi đã có website cũ hoặc fanpage, có tận dụng được không?',
      a: 'Được. LDK đánh giá miễn phí hiện trạng, giữ lại những phần đang hoạt động tốt và chỉ nâng cấp phần cần thiết — tiết kiệm chi phí thay vì đập đi làm lại toàn bộ.',
    },
  ] satisfies Faq[],

  contact: {
    heading: 'Kể LDK nghe bạn đang kinh doanh gì',
    subheading: 'Nhận phương án + báo giá chi tiết trong 24 giờ. Miễn phí, không ràng buộc.',
    formTitle: 'Hoặc để lại lời nhắn',
    fields: {
      name: 'Tên của bạn',
      phone: 'Số điện thoại / Zalo',
      message: 'Bạn đang cần gì? (vd: website cho quán cà phê, app đặt lịch cho spa…)',
      submit: 'Gửi — nhận phản hồi trong 24h',
    },
    success: 'Đã nhận! LDK sẽ liên hệ lại trong vòng 24 giờ. Cần gấp hơn? Nhắn Zalo ngay bên cạnh nhé.',
    fallbackNote: 'Kênh nhanh nhất — phản hồi dưới 2 giờ trong giờ làm việc:',
  },

  footer: {
    about: 'LDK Tech Solutions — studio thiết kế & phát triển sản phẩm số cho hộ kinh doanh và SME Việt Nam. Làm thật, giá thật, đồng hành thật.',
    // Năm cố định để HTML prerender và client khớp nhau (tránh hydration mismatch)
    copyright: '© 2026 LDK Tech Solutions.',
  },
} as const
