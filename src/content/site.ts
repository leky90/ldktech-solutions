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
  /** slug trang chi tiết tương ứng trong servicePages */
  slug: string
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

export interface Project {
  name: string
  tag: string
  desc: string
  stack: string
  /** slug trang chi tiết trong projectDetails */
  slug: string
}

export interface ServiceTier {
  name: string
  price: string
  desc: string
  features: string[]
  highlight?: boolean
}

export interface SampleTemplate {
  /** ngành / nhóm khách */
  tag: string
  name: string
  desc: string
  /** slug demo sống trong demoPages — có thì card trỏ về demo thay vì Zalo */
  demo?: string
}

export interface ServicePageData {
  slug: string
  nav: string
  seoTitle: string
  seoDesc: string
  h1: string
  intro: string
  painPoints: string[]
  features: { title: string; desc: string }[]
  /** các mẫu thị trường hay đặt làm — demo sẽ dựng sau (Phase 3) */
  samples: SampleTemplate[]
  tiers: ServiceTier[]
  faqs: Faq[]
  /** tên các dự án trong portfolio[] liên quan tới dịch vụ này */
  relatedProjects: string[]
}

export interface Testimonial {
  quote: string
  author: string
  context: string
}

// ── Phase 2+3 (docs/plans/idempotent-zooming-mango.md) ──

export interface ProjectDetail {
  slug: string
  /** khớp portfolio[].name */
  name: string
  seoTitle: string
  seoDesc: string
  h1: string
  summary: string
  /** bối cảnh & bài toán — chỉ mô tả định tính, KHÔNG bịa số liệu kết quả */
  context: string[]
  /** phạm vi LDK đảm nhận */
  scope: string[]
  /** kết quả định tính có thể kiểm chứng qua chính sản phẩm */
  outcome: string[]
  /** slug các trang dịch vụ liên quan */
  services: string[]
}

export interface IndustrySolution {
  title: string
  desc: string
  serviceSlug: string
  from: string
}

export interface IndustryPage {
  slug: string
  nav: string
  seoTitle: string
  seoDesc: string
  h1: string
  intro: string
  painPoints: string[]
  solutions: IndustrySolution[]
  /** lộ trình đầu tư từ nhỏ đến lớn */
  roadmap: { stage: string; desc: string }[]
  faqs: Faq[]
  /** tag mẫu liên quan trong servicePages[].samples */
  sampleTags: string[]
  demoSlug?: string
}

export interface DemoPage {
  slug: string
  kind: 'mini-app' | 'website' | 'web-app'
  /** thương hiệu HƯ CẤU dùng trong demo — dữ liệu minh hoạ */
  name: string
  seoTitle: string
  seoDesc: string
  tagline: string
  /** dịch vụ tương ứng để CTA trỏ đúng trang báo giá */
  serviceSlug: string
  from: string
}

export const SITE = {
  name: 'LDK Tech Solutions',
  brand: 'LDK Tech',
  tagline: 'Thiết kế Website, App & Zalo Mini App cho hộ kinh doanh và SME',

  // ── URL & liên hệ (1 chỗ duy nhất) ──
  siteUrl: 'https://ldktech.com/',
  // SĐT mã hoá base64-đảo-ngược, CHỈ giải mã phía client (src/lib/phone.ts)
  // để số thật không xuất hiện trong HTML tĩnh — chống bot quét spam.
  // Đổi số: node -e "console.log(Buffer.from('SỐ_MỚI'.split('').reverse().join('')).toString('base64'))"
  phoneB64: 'NDUxNjM0OTY5MA==',
  phoneMask: '09•• ••• •••',
  // Email domain riêng — Cloudflare Email Routing forward về gmail công ty
  email: 'support@ldktech.com',
  // Cloudflare Worker nhận lead (source: worker/ trong repo) -> gửi email về SITE.email.
  // Để trống '' -> form ẩn, section liên hệ chỉ hiện kênh Zalo/gọi.
  leadApiUrl: 'https://ldk-lead.ldktech.workers.dev/',

  nav: [
    { label: 'Dịch vụ', href: '/dich-vu/' },
    { label: 'Giải pháp', href: '/giai-phap/' },
    { label: 'Dự án', href: '/du-an/' },
    { label: 'Mẫu tham khảo', href: '/mau-tham-khao/' },
    { label: 'Bảng giá', href: '/bang-gia/' },
  ],

  hero: {
    eyebrow: '~/ldk-tech · thiết kế & phát triển sản phẩm số',
    // H1 giữ đủ keyword SEO chính
    h1Lines: ['Website, App', '& Zalo Mini App', 'cho người kinh doanh.'],
    sub: 'Giá chốt trước khi làm. Bàn giao đúng hẹn. Trao đổi 100% qua Zalo bằng ngôn ngữ dễ hiểu. LDK Tech đồng hành cùng hộ kinh doanh & SME từ ý tưởng đến khi ra đơn hàng đầu tiên — và sau đó nữa.',
    ctaPrimary: 'Chat Zalo ngay',
    ctaSecondary: 'Xem bảng giá',
    // Số liệu năng lực có kiểm chứng nội bộ — KHÔNG nêu tên nền tảng freelancer trên website
    trust: ['12+ năm phát triển phần mềm', '180+ dự án · khách hàng 4 quốc gia', '99% đúng hẹn · 100% đúng ngân sách'],
  },

  marquee: [
    'Website chuẩn SEO',
    'Web App quản lý',
    'Mobile App iOS/Android',
    'Zalo Mini App',
    'Giá minh bạch',
    'Bàn giao đúng hẹn',
    'Trợ lý AI cho doanh nghiệp',
    'Tự động hoá quy trình',
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
      from: 'từ 5 triệu',
      slug: 'thiet-ke-website',
    },
    {
      num: '02',
      title: 'Web App quản lý & vận hành',
      desc: 'Phần mềm chạy trên trình duyệt, đo ni đóng giày cho quy trình của bạn: đơn hàng, kho, khách hàng, báo cáo.',
      fit: 'SME muốn bỏ Excel, chuỗi cửa hàng, xưởng sản xuất nhỏ.',
      features: ['Thiết kế theo quy trình thật', 'Phân quyền nhân viên', 'Báo cáo trực quan', 'Chạy mọi thiết bị, không cần cài'],
      from: 'từ 25 triệu',
      slug: 'web-app',
    },
    {
      num: '03',
      title: 'Mobile App iOS & Android',
      desc: 'App cài trên điện thoại khách hàng — đặt lịch, tích điểm, nhận thông báo khuyến mãi. Một mã nguồn, chạy cả hai hệ.',
      fit: 'Thương hiệu muốn giữ chân khách quen: chuỗi F&B, phòng gym, salon.',
      features: ['Một app chạy cả iPhone & Android', 'Đặt lịch & tích điểm', 'Thông báo đẩy khuyến mãi', 'Đưa lên App Store & Google Play'],
      from: 'từ 40 triệu',
      slug: 'mobile-app',
    },
    {
      num: '04',
      title: 'Zalo Mini App',
      desc: 'App chạy ngay trong Zalo — khách không cần cài gì thêm. Đặt hàng, đặt lịch, thẻ thành viên, ưu đãi: mở Zalo là xong.',
      fit: 'Hộ kinh doanh & SME có tệp khách Zalo — tức là gần như mọi khách hàng Việt.',
      features: ['Không cần cài đặt, mở là dùng', 'Chi phí thấp hơn app thường', 'Gắn với Zalo OA & tin nhắn ZNS', 'Đặt hàng / đặt lịch / thành viên'],
      from: 'từ 15 triệu',
      badge: 'Đáng đầu tư nhất',
      slug: 'zalo-mini-app',
    },
  ] satisfies Service[],

  // Dự án tiêu biểu đã bàn giao
  portfolio: [
    {
      name: 'FoodMap',
      tag: 'Sàn TMĐT nông sản',
      desc: 'Sàn thương mại điện tử kết nối nông sản Việt từ nông trại đến người mua — danh mục ngàn sản phẩm, đặt hàng và thanh toán online.',
      stack: 'React · Web App',
      slug: 'foodmap',
    },
    {
      name: 'Native',
      tag: 'Du lịch & trải nghiệm',
      desc: 'Nền tảng đặt tour và trải nghiệm du lịch: tìm kiếm, đặt chỗ, thanh toán — tối ưu cho khách dùng điện thoại.',
      stack: 'React · Website + Web App',
      slug: 'native',
    },
    {
      name: 'Build-to-Rent',
      tag: 'Bất động sản',
      desc: 'Web app quản lý cho thuê bất động sản: danh sách căn hộ, đặt lịch xem nhà, trang quản trị cho chủ đầu tư.',
      stack: 'React · Node.js · Web App',
      slug: 'build-to-rent',
    },
    {
      name: 'Controllermodz',
      tag: 'E-commerce (Anh)',
      desc: 'Cửa hàng online bán tay cầm game custom cho thị trường Anh — cấu hình sản phẩm theo ý khách ngay trên web.',
      stack: 'Magento · Website bán hàng',
      slug: 'controllermodz',
    },
    {
      name: 'Ciga.fr',
      tag: 'E-commerce (Pháp)',
      desc: 'Storefront thương mại điện tử cho thị trường Pháp: giỏ hàng, thanh toán, quản lý đơn — vận hành ổn định nhiều năm.',
      stack: 'PrestaShop · Website bán hàng',
      slug: 'ciga-fr',
    },
    {
      name: 'Treehouse',
      tag: 'Fintech (Singapore)',
      desc: 'Nền tảng tài chính số hoá tài sản — phụ trách toàn bộ giao diện cùng đội ngũ 8 kỹ sư: dashboard realtime, dữ liệu on-chain.',
      stack: 'React · Web App · Fintech',
      slug: 'treehouse',
    },
  ] satisfies Project[],

  // Nhận xét nguyên văn từ khách hàng (không nêu nền tảng nguồn trên website)
  testimonials: [
    {
      quote: 'Hiện tại đây là đối tác tôi hay hợp tác nhất mỗi khi có dự án gì về lập trình web.',
      author: 'Đỗ Hồng Nam',
      context: 'Khách hàng hợp tác nhiều dự án',
    },
    {
      quote: 'Có thể giải quyết được những bài toán tưởng chừng như không thể.',
      author: 'Vietnam Smart BPO',
      context: 'Dự án website doanh nghiệp',
    },
    {
      quote: 'Chắc chắn và trung thực. Hoàn thành công việc được giao đúng hẹn.',
      author: 'Phan Tuấn Phúc',
      context: 'Dự án phần mềm quản lý tài liệu',
    },
  ] satisfies Testimonial[],

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
      price: 'từ 5 triệu',
      priceNote: 'trọn gói',
      desc: 'Landing page hoặc website giới thiệu 1–5 trang. Mặt tiền online đầu tiên cho việc kinh doanh của bạn.',
      features: ['Thiết kế theo thương hiệu', 'Chuẩn SEO cơ bản', 'Form liên hệ + nút Zalo', 'Hướng dẫn hosting tiết kiệm', 'Bàn giao 7–10 ngày'],
      cta: 'Nhận báo giá chi tiết',
    },
    {
      name: 'Tăng trưởng',
      price: 'từ 15 triệu',
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

  // ── 4 trang dịch vụ riêng: SEO + giá riêng + FAQ riêng ──
  servicePages: [
    {
      slug: 'thiet-ke-website',
      nav: 'Thiết kế Website',
      seoTitle: 'Thiết kế website chuẩn SEO cho hộ kinh doanh — từ 5 triệu',
      seoDesc: 'Thiết kế website giới thiệu & bán hàng chuẩn SEO, tải nhanh, tự quản lý nội dung. Trọn gói từ 5 triệu, bàn giao 7–10 ngày, bảo hành 6 tháng.',
      h1: 'Thiết kế website cho người kinh doanh',
      intro: 'Website là mặt tiền online của bạn: khách Google là thấy, xem là tin, gọi là chốt. LDK làm website tải nhanh, chuẩn SEO, và bạn tự cập nhật được nội dung — không phụ thuộc ai.',
      painPoints: [
        'Khách tìm trên Google nhưng chỉ thấy đối thủ',
        'Chỉ có fanpage — bài trôi mất, khách không tìm được thông tin',
        'Web cũ chậm, vỡ giao diện trên điện thoại',
        'Muốn sửa nội dung phải chờ "bên làm web" phản hồi',
      ],
      features: [
        { title: 'Thiết kế theo thương hiệu', desc: 'Không dùng theme đại trà — giao diện riêng theo màu sắc, logo, ngành hàng của bạn.' },
        { title: 'Chuẩn SEO từ gốc', desc: 'Cấu trúc nội dung, tốc độ tải, dữ liệu cho Google — để khách tìm là thấy bạn.' },
        { title: 'Đẹp trên mọi điện thoại', desc: 'Đa số khách Việt xem web trên điện thoại — mọi trang được làm mobile-first.' },
        { title: 'Tự quản lý nội dung', desc: 'Đổi giá, thêm món, đăng khuyến mãi — bạn tự làm được sau 1 buổi hướng dẫn.' },
        { title: 'Nút Zalo & form nhận khách', desc: 'Khách bấm một nút là nhắn Zalo hoặc để lại số — không mất lead nào.' },
        { title: 'Google Maps & đánh giá', desc: 'Gắn bản đồ, giờ mở cửa, review — đủ thông tin để khách quyết định ghé.' },
      ],
      samples: [
        { tag: 'F&B', name: 'Website nhà hàng, quán cà phê', desc: 'Menu đẹp, đặt bàn, chỉ đường Google Maps — khách xem là muốn ghé.', demo: 'website-nha-hang' },
        { tag: 'Làm đẹp', name: 'Website spa, salon, thẩm mỹ', desc: 'Bảng giá dịch vụ, hình ảnh trước–sau, nút đặt lịch qua Zalo.' },
        { tag: 'Bán lẻ', name: 'Website thời trang, mỹ phẩm', desc: 'Catalog sản phẩm, giỏ hàng, chương trình khuyến mãi theo mùa.' },
        { tag: 'Bất động sản', name: 'Website môi giới & dự án', desc: 'Danh sách nhà đất có bộ lọc, trang chi tiết dự án, form nhận tư vấn.' },
        { tag: 'Doanh nghiệp', name: 'Website công ty & hồ sơ năng lực', desc: 'Dịch vụ, dự án đã làm, đội ngũ — đủ uy tín để đấu thầu, ký hợp đồng.' },
        { tag: 'Quảng cáo', name: 'Landing page sản phẩm, chiến dịch', desc: 'Một trang tối ưu chuyển đổi để chạy quảng cáo Facebook, Google.' },
        { tag: 'Du lịch', name: 'Website tour & khách sạn', desc: 'Danh sách tour, lịch trống, đặt chỗ và thanh toán giữ chỗ.' },
        { tag: 'Giáo dục', name: 'Website trung tâm, khoá học', desc: 'Chương trình học, lịch khai giảng, form đăng ký giữ chỗ.' },
      ],
      tiers: [
        {
          name: 'Landing page',
          price: '5 triệu',
          desc: 'Một trang duy nhất, đủ thông tin chốt khách — hợp quảng cáo, khai trương, giới thiệu dịch vụ.',
          features: ['1 trang dài đủ nội dung', 'Form + nút Zalo', 'Chuẩn SEO cơ bản', 'Bàn giao 7–10 ngày'],
        },
        {
          name: 'Web giới thiệu',
          price: '8 triệu',
          desc: 'Website 3–7 trang: trang chủ, dịch vụ, bảng giá, về chúng tôi, liên hệ.',
          features: ['3–7 trang nội dung', 'Tự quản lý nội dung', 'Google Maps + đánh giá', 'Bàn giao 2–3 tuần'],
          highlight: true,
        },
        {
          name: 'Web bán hàng',
          price: 'từ 15 triệu',
          desc: 'Giỏ hàng, thanh toán, quản lý đơn & kho — bán hàng thật sự trên web của bạn.',
          features: ['Giỏ hàng + thanh toán online', 'Quản lý đơn & tồn kho', 'Kết nối vận chuyển', 'Bàn giao 3–5 tuần'],
        },
      ],
      faqs: [
        { q: 'Tôi đã có tên miền và hosting, có dùng lại được không?', a: 'Được — LDK kiểm tra miễn phí và dùng lại nếu còn tốt. Nếu chưa có, LDK hướng dẫn bạn mua đúng loại, tránh mua thừa (thường chỉ 300–800 nghìn/năm).' },
        { q: 'Website có tự hiện lên Google không?', a: 'Sau khi bàn giao, website được khai báo với Google và thường xuất hiện sau 1–2 tuần. Thứ hạng cao hay thấp phụ thuộc nội dung và cạnh tranh ngành — LDK làm nền tảng chuẩn SEO và hướng dẫn bạn viết nội dung để leo hạng.' },
        { q: 'Tôi có phải trả phí hàng tháng không?', a: 'Không có phí bắt buộc cho LDK. Bạn chỉ trả phí tên miền + hosting cho nhà cung cấp (thường dưới 1 triệu/năm). Gói chăm sóc định kỳ là tùy chọn.' },
        { q: 'Làm website mất bao lâu?', a: 'Landing page: 7–10 ngày. Web giới thiệu: 2–3 tuần. Web bán hàng: 3–5 tuần. Mốc cụ thể ghi trong báo giá và cập nhật tiến độ qua Zalo mỗi tuần.' },
      ],
      relatedProjects: ['Ciga.fr', 'Controllermodz'],
    },
    {
      slug: 'zalo-mini-app',
      nav: 'Zalo Mini App',
      seoTitle: 'Làm Zalo Mini App: bán hàng, đặt lịch — từ 15 triệu',
      seoDesc: 'Phát triển Zalo Mini App cho hộ kinh doanh & SME: khách mở Zalo là dùng, không cần cài app. Đặt hàng, đặt lịch, thẻ thành viên, gửi ZNS. Từ 15 triệu.',
      h1: 'Làm Zalo Mini App — khách mở Zalo là mua được',
      intro: 'Gần như mọi khách hàng Việt đều có Zalo. Mini App chạy ngay trong Zalo: không cần tải, không cần đăng ký — bấm là đặt hàng, đặt lịch, tích điểm. Chi phí chỉ bằng một phần app thường.',
      painPoints: [
        'Khách quen nhắn Zalo nhưng mỗi đơn đều phải chat tay',
        'Muốn có app riêng nhưng chi phí app thường quá cao',
        'Khách ngại tải thêm app mới về máy',
        'Có Zalo OA nhưng chưa khai thác được gì ngoài nhắn tin',
      ],
      features: [
        { title: 'Không cần cài đặt', desc: 'Khách quét QR hoặc bấm link là mở app ngay trong Zalo — không rào cản tải về.' },
        { title: 'Đặt hàng & đặt lịch', desc: 'Menu, giỏ hàng, chọn giờ hẹn — đơn tự chảy về, hết cảnh chat tay từng khách.' },
        { title: 'Thẻ thành viên & tích điểm', desc: 'Khách quen tự xem điểm, đổi ưu đãi — giữ chân không tốn thẻ giấy.' },
        { title: 'Gửi tin ZNS', desc: 'Xác nhận đơn, nhắc lịch hẹn, báo khuyến mãi qua tin nhắn Zalo chính thức.' },
        { title: 'Gắn với Zalo OA', desc: 'Mini App + OA + ZNS thành một hệ chăm sóc khách hoàn chỉnh trên Zalo.' },
        { title: 'Thanh toán trong app', desc: 'Khách trả tiền ngay trong Zalo — chốt đơn không rời màn hình.' },
      ],
      samples: [
        { tag: 'Làm đẹp', name: 'Đặt lịch spa, salon, nail', desc: 'Chọn dịch vụ, chọn giờ, nhắc hẹn tự động qua ZNS — giảm hẳn khách quên lịch.', demo: 'spa-dat-lich' },
        { tag: 'F&B', name: 'Gọi món QR tại bàn & giao tận nơi', desc: 'Quét QR xem menu, gọi món, thanh toán — dùng luôn cho đặt giao về nhà.', demo: 'goi-mon-qr' },
        { tag: 'Bán lẻ', name: 'Thẻ thành viên & tích điểm', desc: 'Tích điểm tự động sau mỗi đơn, đổi ưu đãi ngay trong Zalo — giữ chân khách quen.' },
        { tag: 'Thực phẩm', name: 'Đặt hàng thực phẩm, nông sản', desc: 'Đơn giao hằng ngày cho cửa hàng thực phẩm sạch, đặc sản vùng miền.' },
        { tag: 'Giáo dục', name: 'Mini app trung tâm & lớp học', desc: 'Lịch học, thông báo nghỉ – học bù, học phí — phụ huynh xem ngay trong Zalo.' },
        { tag: 'Thể thao', name: 'Đặt sân, đặt phòng tập', desc: 'Xem khung giờ trống, giữ chỗ, thanh toán — hợp sân cầu lông, pickleball, gym.' },
        { tag: 'Sự kiện', name: 'Đăng ký sự kiện & check-in vé', desc: 'Đăng ký, nhận vé QR, check-in tại cửa — gọn cho workshop, hội thảo, minishow.' },
      ],
      tiers: [
        {
          name: 'Hiện diện',
          price: '15 triệu',
          desc: 'Mini App giới thiệu + thẻ thành viên tích điểm — bước đầu đưa khách quen lên Zalo.',
          features: ['Giới thiệu & bảng giá', 'Thẻ thành viên, tích điểm', 'Kết nối Zalo OA', 'Bàn giao 2–3 tuần'],
        },
        {
          name: 'Bán hàng & đặt lịch',
          price: '25 triệu',
          desc: 'Đặt hàng hoặc đặt lịch hoàn chỉnh, thanh toán, thông báo ZNS — ra đơn thật từ Zalo.',
          features: ['Đặt hàng / đặt lịch', 'Thanh toán trong app', 'Tin ZNS xác nhận & nhắc hẹn', 'Bàn giao 3–5 tuần'],
          highlight: true,
        },
        {
          name: 'Tích hợp sâu',
          price: 'từ 35 triệu',
          desc: 'Nối Mini App với phần mềm quản lý, CRM, kho — Zalo thành một kênh trong hệ thống của bạn.',
          features: ['Đồng bộ CRM / quản lý kho', 'Kịch bản ZNS tự động', 'Báo cáo doanh thu kênh Zalo', 'Theo phạm vi dự án'],
        },
      ],
      faqs: [
        { q: 'Zalo Mini App khác gì app thường?', a: 'Mini App chạy bên trong Zalo nên khách không cần tải hay cài gì — mở Zalo là dùng được. Chi phí thấp hơn app native đáng kể và tận dụng tệp khách Zalo sẵn có.' },
        { q: 'Tôi cần có gì trước khi làm Mini App?', a: 'Chỉ cần một tài khoản Zalo OA (LDK hỗ trợ đăng ký miễn phí nếu chưa có). Mọi thứ còn lại — thiết kế, phát triển, xét duyệt với Zalo — LDK lo trọn gói.' },
        { q: 'Zalo có thu phí Mini App không?', a: 'Zalo không thu phí phát hành hay duy trì Mini App. Chi phí phát sinh (nếu có) là phí gửi tin ZNS theo giá Zalo và server nếu hệ thống của bạn cần — đều được báo trước.' },
        { q: 'Mini App có gửi thông báo cho khách được không?', a: 'Được — qua tin ZNS (Zalo Notification Service): xác nhận đơn, nhắc lịch hẹn, thông báo ưu đãi. Tin gửi từ OA chính thức nên tỉ lệ đọc cao hơn SMS nhiều.' },
      ],
      relatedProjects: ['FoodMap', 'Native'],
    },
    {
      slug: 'web-app',
      nav: 'Web App quản lý',
      seoTitle: 'Web App quản lý theo yêu cầu — bỏ Excel, từ 25 triệu',
      seoDesc: 'Phần mềm quản lý chạy trên trình duyệt, thiết kế theo đúng quy trình của bạn: đơn hàng, kho, khách hàng, báo cáo realtime. MVP từ 25 triệu.',
      h1: 'Web app quản lý đo ni đóng giày cho doanh nghiệp',
      intro: 'Phần mềm đóng gói bắt bạn đổi quy trình theo nó. LDK làm ngược lại: phần mềm theo đúng cách bạn đang vận hành — đơn hàng, kho, khách hàng, báo cáo — chạy trên trình duyệt, không cần cài.',
      painPoints: [
        'Vận hành bằng Excel + Zalo, số liệu mỗi người một bản',
        'Phần mềm có sẵn không khớp quy trình, dùng nửa vời rồi bỏ',
        'Nhân viên nhập tay nhiều, sai sót khó truy ngược',
        'Muốn xem doanh thu hôm nay phải gọi điện hỏi từng người',
      ],
      features: [
        { title: 'Theo quy trình thật của bạn', desc: 'LDK ngồi nghe cách bạn vận hành trước, rồi mới thiết kế — không bắt bạn đổi theo phần mềm.' },
        { title: 'Phân quyền nhân viên', desc: 'Ai được xem gì, sửa gì — rõ ràng từng vai trò, dữ liệu nhạy cảm chỉ chủ thấy.' },
        { title: 'Báo cáo thời gian thực', desc: 'Doanh thu, tồn kho, công nợ — mở điện thoại là thấy, không chờ tổng hợp cuối tháng.' },
        { title: 'Chạy mọi thiết bị', desc: 'Trình duyệt trên máy tính, tablet, điện thoại — không cài đặt, không lo hệ điều hành.' },
        { title: 'Nhập liệu một lần', desc: 'Đơn tạo một nơi, kho trừ tự động, công nợ tự cập nhật — hết cảnh nhập 3 chỗ.' },
        { title: 'Lớn cùng doanh nghiệp', desc: 'Bắt đầu từ MVP gọn, thêm module khi cần — trả tiền theo giai đoạn, không ôm rủi ro.' },
      ],
      samples: [
        { tag: 'Bán hàng', name: 'Quản lý bán hàng & tồn kho', desc: 'Tạo đơn, trừ kho tự động, lãi lỗ theo ngày — thay hẳn file Excel.' },
        { tag: 'Làm đẹp', name: 'Quản lý spa & lịch hẹn', desc: 'Lịch kỹ thuật viên, liệu trình của từng khách, hoa hồng nhân viên.' },
        { tag: 'Bất động sản', name: 'Quản lý cho thuê căn hộ, phòng trọ', desc: 'Hợp đồng, chốt điện nước, nhắc thu tiền hằng tháng.' },
        { tag: 'Kinh doanh', name: 'Quản lý khách hàng & báo giá', desc: 'Lịch sử chăm sóc từng khách, tạo báo giá đẹp, nhắc lịch gọi lại.' },
        { tag: 'Sản xuất', name: 'Quản lý đơn xưởng & đội thi công', desc: 'Tiến độ từng đơn, phân việc, ảnh nghiệm thu — chủ xem được từ xa.' },
        { tag: 'Phân phối', name: 'Cổng đặt hàng cho đại lý', desc: 'Đại lý tự đặt theo bảng giá riêng, công nợ rõ ràng từng bên.' },
        { tag: 'Vận hành', name: 'Bảng số liệu kinh doanh', desc: 'Gom doanh thu mọi kênh (cửa hàng, online, sàn) về một màn hình.' },
      ],
      tiers: [
        {
          name: 'MVP',
          price: 'từ 25 triệu',
          desc: 'Bản gọn giải quyết 1–2 nghiệp vụ đau nhất (ví dụ: đơn hàng + kho) — chạy thật trong 4–6 tuần.',
          features: ['1–2 nghiệp vụ cốt lõi', 'Phân quyền cơ bản', 'Báo cáo thiết yếu', 'Bàn giao 4–6 tuần'],
        },
        {
          name: 'Hệ quản lý đầy đủ',
          price: 'từ 45 triệu',
          desc: 'Đơn — kho — khách hàng — công nợ — báo cáo trong một hệ thống liền mạch.',
          features: ['Đủ nghiệp vụ vận hành', 'Phân quyền chi tiết', 'Báo cáo realtime đa chiều', 'Bàn giao 8–12 tuần'],
          highlight: true,
        },
        {
          name: 'Theo yêu cầu',
          price: 'Báo giá riêng',
          desc: 'Bài toán đặc thù: tích hợp máy móc, kết nối hệ thống có sẵn, đồng bộ đa chi nhánh.',
          features: ['Phân tích quy trình miễn phí', 'Kiến trúc theo bài toán', 'Phát triển theo giai đoạn', 'Đồng hành dài hạn'],
        },
      ],
      faqs: [
        { q: 'Tôi chưa hình dung được cần những tính năng gì?', a: 'Không sao — buổi tư vấn miễn phí, LDK nghe cách bạn vận hành hằng ngày rồi đề xuất bản MVP gọn nhất giải quyết đúng chỗ đau, kèm lộ trình mở rộng. Bạn không cần biết thuật ngữ nào cả.' },
        { q: 'Dữ liệu của tôi có an toàn không?', a: 'Dữ liệu đứng tên bạn, đặt trên server bạn sở hữu (LDK hướng dẫn thuê, thường 100–300 nghìn/tháng), sao lưu tự động định kỳ. LDK bàn giao toàn bộ quyền truy cập.' },
        { q: 'Sao không dùng phần mềm có sẵn cho rẻ?', a: 'Nếu phần mềm đóng gói khớp quy trình của bạn, LDK sẽ khuyên bạn dùng luôn — tư vấn miễn phí mà. Web app riêng đáng tiền khi quy trình của bạn khác biệt và chính nó tạo lợi thế cạnh tranh.' },
        { q: 'Hệ thống có mở rộng thêm được không?', a: 'Được thiết kế để mở rộng từ đầu: thêm module, thêm chi nhánh, thêm người dùng theo giai đoạn — mỗi giai đoạn báo giá riêng, bạn duyệt mới làm.' },
      ],
      relatedProjects: ['Build-to-Rent', 'FoodMap', 'Treehouse'],
    },
    {
      slug: 'mobile-app',
      nav: 'Mobile App',
      seoTitle: 'Làm app iPhone & Android cho thương hiệu — từ 40 triệu',
      seoDesc: 'Phát triển mobile app iOS & Android từ một mã nguồn: đặt lịch, tích điểm, thông báo đẩy. MVP từ 40 triệu, đưa lên App Store & Google Play trọn gói.',
      h1: 'Làm mobile app giữ chân khách quen',
      intro: 'App trên điện thoại là kênh trực tiếp nhất tới khách quen: đặt lịch một chạm, tích điểm tự động, khuyến mãi đến thẳng màn hình khoá. Một mã nguồn chạy cả iPhone và Android — tiết kiệm một nửa chi phí.',
      painPoints: [
        'Khách mua một lần rồi quên mất thương hiệu',
        'Tích điểm bằng thẻ giấy — khách bỏ ví là mất',
        'Gửi khuyến mãi qua SMS vừa đắt vừa bị bỏ qua',
        'Đối thủ lớn trong ngành đã có app riêng',
      ],
      features: [
        { title: 'Một mã nguồn, hai hệ máy', desc: 'iPhone và Android dùng chung một app — chi phí và thời gian gần như một nửa so với làm rời.' },
        { title: 'Thông báo đẩy miễn phí', desc: 'Khuyến mãi, nhắc lịch đến thẳng màn hình khoá — không tốn phí từng tin như SMS.' },
        { title: 'Đặt lịch & tích điểm', desc: 'Khách tự đặt chỗ, tự xem điểm thưởng — quầy lễ tân nhẹ việc hẳn.' },
        { title: 'Lên cả hai chợ ứng dụng', desc: 'LDK lo trọn thủ tục App Store và Google Play — bạn chỉ cần duyệt bản cuối.' },
        { title: 'Đồng bộ với web & quản lý', desc: 'App, web, phần mềm quản lý dùng chung dữ liệu — khách và đơn không lệch nhau.' },
        { title: 'Cập nhật dài hạn', desc: 'iOS/Android đổi mỗi năm — gói đồng hành giữ app luôn chạy mượt và đúng chuẩn chợ.' },
      ],
      samples: [
        { tag: 'F&B', name: 'App tích điểm chuỗi đồ uống', desc: 'Tích điểm, đổi voucher, thông báo món mới — khách nhớ tới bạn mỗi ngày.' },
        { tag: 'Làm đẹp', name: 'App đặt lịch spa & phòng tập', desc: 'Đặt lịch một chạm, nhắc buổi tập – liệu trình, gói thành viên.' },
        { tag: 'Bán lẻ', name: 'App mua sắm của thương hiệu', desc: 'Catalog, flash sale, thông báo đẩy khuyến mãi — kênh bán không mất phí sàn.' },
        { tag: 'Giáo dục', name: 'App học viên của trung tâm', desc: 'Bài học, điểm danh, kết quả — phụ huynh theo dõi sát tiến bộ của con.' },
        { tag: 'Nội bộ', name: 'App nhân viên & chấm công', desc: 'Chấm công định vị, giao việc, duyệt nghỉ phép — hợp chuỗi nhiều chi nhánh.' },
        { tag: 'Cộng đồng', name: 'App câu lạc bộ & hội nhóm', desc: 'Sự kiện, danh sách thành viên, thông báo — cho CLB thể thao, hội doanh nhân.' },
      ],
      tiers: [
        {
          name: 'MVP',
          price: 'từ 40 triệu',
          desc: 'App gọn với tính năng cốt lõi: đặt lịch hoặc tích điểm + thông báo đẩy — ra chợ trong 6–8 tuần.',
          features: ['1–2 tính năng cốt lõi', 'Thông báo đẩy', 'Lên App Store + Google Play', 'Bàn giao 6–8 tuần'],
        },
        {
          name: 'Bản đầy đủ',
          price: 'từ 70 triệu',
          desc: 'Đặt lịch + tích điểm + ưu đãi + thanh toán — trải nghiệm khách quen hoàn chỉnh.',
          features: ['Đủ tính năng chăm khách', 'Thanh toán trong app', 'Trang quản trị riêng', 'Bàn giao 10–14 tuần'],
          highlight: true,
        },
        {
          name: 'Theo yêu cầu',
          price: 'Báo giá riêng',
          desc: 'App đặc thù ngành hoặc tích hợp hệ thống lớn — thiết kế kiến trúc riêng theo bài toán.',
          features: ['Phân tích yêu cầu miễn phí', 'Thiết kế UX riêng', 'Phát triển theo giai đoạn', 'Đồng hành dài hạn'],
        },
      ],
      faqs: [
        { q: 'Nên làm app thường hay Zalo Mini App?', a: 'Nếu khách của bạn chủ yếu ở Việt Nam và bài toán là đặt hàng/đặt lịch/tích điểm — Mini App thường hiệu quả hơn với chi phí thấp hơn. App thường đáng đầu tư khi bạn cần thông báo đẩy miễn phí, trải nghiệm sâu, hoặc khách quốc tế. Buổi tư vấn miễn phí sẽ giúp bạn chọn đúng.' },
        { q: 'Phí duy trì app hằng năm là bao nhiêu?', a: 'Phí bắt buộc: tài khoản Apple Developer ~25 USD/năm và Google Play 25 USD một lần. Server tùy quy mô (thường 100–500 nghìn/tháng). Gói cập nhật hệ điều hành mới là tùy chọn, báo giá trước.' },
        { q: 'App có bị Apple/Google từ chối không?', a: 'LDK làm theo chuẩn xét duyệt của cả hai chợ ngay từ thiết kế và chịu trách nhiệm nộp đến khi được duyệt — đã đưa nhiều app lên cả App Store lẫn Google Play.' },
        { q: 'Tôi có được sở hữu mã nguồn không?', a: 'Có — 100% mã nguồn, tài khoản chợ ứng dụng và dữ liệu đứng tên bạn. Muốn đổi đơn vị phát triển sau này hoàn toàn được, không bị "giữ chân".' },
      ],
      relatedProjects: ['Native', 'Treehouse'],
    },
    {
      slug: 'tro-ly-ai',
      nav: 'Trợ lý AI',
      seoTitle: 'Làm trợ lý AI, chatbot cho doanh nghiệp — từ 15 triệu',
      seoDesc: 'Chatbot AI trả lời từ dữ liệu thật của doanh nghiệp: bảng giá, tồn kho, chính sách. Gắn vào website, Zalo — trực 24/7, chốt khách thay bạn. Từ 15 triệu.',
      h1: 'Trợ lý AI trực và chốt khách thay bạn 24/7',
      intro: 'Chatbot đại trà trả lời như cái máy vì không biết gì về bạn. LDK làm trợ lý AI được "học" từ chính dữ liệu doanh nghiệp — bảng giá, chính sách, tồn kho — trả lời khách trên website, Zalo, Messenger như một nhân viên thạo việc, lúc 2 giờ sáng cũng vậy.',
      painPoints: [
        'Khách nhắn lúc 10 giờ đêm, sáng ra đã mua chỗ khác',
        'Thuê người trực fanpage tốn 7–10 triệu/tháng mà vẫn sót tin',
        'Cùng một câu hỏi giá – ship – bảo hành phải trả lời cả trăm lần',
        'Thử chatbot mẫu nhưng nó trả lời sai giá, khách mất lòng tin',
      ],
      features: [
        { title: 'Học từ dữ liệu của bạn', desc: 'Nạp bảng giá, chính sách, mô tả sản phẩm — bot trả lời đúng thông tin của bạn, không bịa.' },
        { title: 'Trực mọi kênh cùng lúc', desc: 'Website, Zalo OA, Messenger — một bộ não, trả lời đồng nhất mọi nơi.' },
        { title: 'Biết lúc nào cần người thật', desc: 'Câu khó hoặc khách nóng — bot chuyển cho bạn kèm tóm tắt cuộc trò chuyện.' },
        { title: 'Chốt khách, không chỉ trả lời', desc: 'Gợi ý sản phẩm hợp nhu cầu, xin số điện thoại, hẹn lịch — đưa khách tới bước mua.' },
        { title: 'Ngày càng thông minh hơn', desc: 'Xem lại câu bot trả lời chưa tốt, bổ sung kiến thức — chất lượng tăng theo tuần.' },
        { title: 'Chi phí rõ ràng', desc: 'Báo trước chi phí AI hằng tháng theo lượng tin nhắn — thường chỉ vài trăm nghìn.' },
      ],
      samples: [
        { tag: 'Bán lẻ', name: 'Bot tư vấn sản phẩm', desc: 'Khách mô tả nhu cầu — bot gợi ý đúng món từ catalog, báo giá, báo còn hàng.' },
        { tag: 'F&B', name: 'Bot nhận đơn qua tin nhắn', desc: 'Nhận đơn, xác nhận, báo phí giao — không sót tin nhắn lúc quán đông.' },
        { tag: 'Làm đẹp', name: 'Trợ lý đặt lịch & nhắc hẹn', desc: 'Bot xem lịch trống, chốt giờ hẹn, trả lời về dịch vụ — kể cả ngoài giờ.' },
        { tag: 'Dịch vụ', name: 'Bot trả lời từ tài liệu nội bộ', desc: 'Nạp quy trình, chính sách — trả lời cả khách lẫn nhân viên mới, đỡ hỏi đi hỏi lại.' },
        { tag: 'Giáo dục', name: 'Bot tư vấn tuyển sinh', desc: 'Trả lời học phí, lịch khai giảng; lọc lead nóng chuyển ngay cho tư vấn viên.' },
        { tag: 'Vận hành', name: 'Trợ lý soạn nội dung & báo cáo', desc: 'Soạn bài đăng, mô tả sản phẩm, tóm tắt số liệu tuần — theo giọng thương hiệu của bạn.' },
      ],
      tiers: [
        {
          name: 'Bot hỏi–đáp',
          price: '15 triệu',
          desc: 'Trả lời câu hỏi thường gặp từ dữ liệu của bạn, trên website hoặc Zalo.',
          features: ['Học từ tài liệu bạn cung cấp', '1 kênh (web hoặc Zalo)', 'Chuyển người thật khi cần', 'Bàn giao 2–3 tuần'],
        },
        {
          name: 'Trợ lý bán hàng',
          price: '25 triệu',
          desc: 'Tư vấn sản phẩm, xin liên hệ, hẹn lịch — đa kênh, có trang quản trị xem lại hội thoại.',
          features: ['Đa kênh web + Zalo + Messenger', 'Gợi ý sản phẩm, thu lead', 'Trang quản trị & thống kê', 'Bàn giao 3–5 tuần'],
          highlight: true,
        },
        {
          name: 'AI tự thực thi',
          price: 'từ 40 triệu',
          desc: 'AI nối vào hệ thống của bạn: tạo đơn, tra tồn kho thật, đặt lịch vào phần mềm quản lý.',
          features: ['Nối phần mềm quản lý, kho', 'Thao tác thay người thật', 'Kịch bản riêng theo quy trình', 'Theo phạm vi dự án'],
        },
      ],
      faqs: [
        { q: 'Bot có trả lời sai, "bịa" thông tin không?', a: 'Bot chỉ được phép trả lời dựa trên dữ liệu bạn cung cấp; câu nằm ngoài phạm vi sẽ xin phép chuyển cho người thật thay vì đoán bừa. Trước khi chạy thật đều có giai đoạn chạy thử để bạn duyệt câu trả lời.' },
        { q: 'Chi phí AI hằng tháng là bao nhiêu?', a: 'Tính theo lượng tin nhắn, với hộ kinh doanh thường chỉ 100–500 nghìn/tháng, trả trực tiếp cho nhà cung cấp AI — LDK cấu hình để bạn thấy rõ và tự kiểm soát hoá đơn.' },
        { q: 'Dữ liệu của tôi có bị lộ không?', a: 'Dữ liệu nằm trong hệ thống đứng tên bạn; các nhà cung cấp AI lớn cam kết không dùng dữ liệu doanh nghiệp để huấn luyện. LDK tư vấn rõ nên và không nên đưa gì cho bot ngay từ buổi đầu.' },
        { q: 'Tôi cập nhật giá, bot có tự biết không?', a: 'Có — bot đọc từ nguồn dữ liệu bạn cập nhật (bảng tính, trang quản trị). Đổi giá ở một chỗ, bot trả lời theo giá mới ngay.' },
      ],
      relatedProjects: [],
    },
    {
      slug: 'tu-dong-hoa',
      nav: 'Tự động hoá',
      seoTitle: 'Tự động hoá quy trình cho SME — bớt việc tay, từ 5 triệu',
      seoDesc: 'Tự động hoá việc lặp lại: đồng bộ đơn sàn TMĐT, xuất hoá đơn, nhắc ZNS, báo cáo mỗi sáng. Làm một lần, chạy mỗi ngày. Setup từ 5 triệu.',
      h1: 'Tự động hoá việc lặp lại — làm một lần, chạy mỗi ngày',
      intro: 'Mỗi ngày bạn (hoặc nhân viên) mất hàng giờ chép đơn từ sàn vào Excel, nhắn xác nhận từng khách, cộng sổ cuối ngày. LDK nối các công cụ bạn đang dùng lại với nhau để những việc đó tự chạy — trên hệ thống bạn sở hữu, không phí thuê bao nền tảng nước ngoài.',
      painPoints: [
        'Chép đơn từ Shopee/TikTok Shop vào sổ, ngày nào cũng vậy',
        'Quên nhắn xác nhận, khách hỏi "đơn em đâu rồi?"',
        'Cuối tháng mất cả buổi đối soát COD với bên vận chuyển',
        'Muốn biết doanh thu hôm qua phải chờ nhân viên tổng hợp',
      ],
      features: [
        { title: 'Nối công cụ bạn đang dùng', desc: 'Sàn TMĐT, bảng tính, phần mềm kế toán, Zalo — dữ liệu tự chảy giữa chúng, hết chép tay.' },
        { title: 'Chạy trên hệ thống của bạn', desc: 'Dựng trên nền tảng mã nguồn mở đặt tại server bạn sở hữu — không phí bản quyền hằng tháng.' },
        { title: 'Tin nhắn tự động đúng lúc', desc: 'Xác nhận đơn, nhắc hẹn, hỏi đánh giá — gửi qua Zalo ZNS theo kịch bản, không cần ai bấm.' },
        { title: 'Báo cáo tự đến mỗi sáng', desc: '7 giờ sáng nhận tin: doanh thu hôm qua, đơn chờ xử lý, mặt hàng sắp hết.' },
        { title: 'Có AI khi cần suy nghĩ', desc: 'Phân loại phản hồi khách, soạn nội dung, đọc hoá đơn — gắn AI vào đúng bước cần.' },
        { title: 'Giao lại quyền điều khiển', desc: 'Bàn giao kèm hướng dẫn bật/tắt, theo dõi từng luồng — bạn không phụ thuộc LDK.' },
      ],
      samples: [
        { tag: 'TMĐT', name: 'Gom đơn sàn về một chỗ', desc: 'Shopee, Lazada, TikTok Shop đổ đơn về một bảng — tự trừ kho, tự báo Zalo.' },
        { tag: 'Kế toán', name: 'Tự xuất hoá đơn & đối soát', desc: 'Đơn chốt xong tự tạo hoá đơn; cuối ngày tự đối soát COD với vận chuyển.' },
        { tag: 'CSKH', name: 'Kịch bản ZNS tự động', desc: 'Xác nhận đơn, nhắc lịch hẹn, hỏi đánh giá sau 3 ngày — chạy không cần ai nhớ.' },
        { tag: 'Marketing', name: 'Đăng bài đa kênh theo lịch', desc: 'Soạn một lần — tự đăng website, fanpage, Zalo OA đúng khung giờ.' },
        { tag: 'Vận hành', name: 'Báo cáo Zalo mỗi sáng', desc: 'Doanh thu, đơn chờ, hàng sắp hết — đến điện thoại chủ trước giờ mở cửa.' },
        { tag: 'Giấy tờ', name: 'Tự điền hợp đồng, báo giá', desc: 'Nhập số liệu là ra file hợp đồng, báo giá, phiếu thu theo mẫu — gửi khách trong phút.' },
      ],
      tiers: [
        {
          name: 'Luồng đầu tiên',
          price: '5 triệu',
          desc: 'Tự động hoá một việc đau nhất (vd: gom đơn sàn, hoặc kịch bản ZNS) — thấy hiệu quả trong tuần.',
          features: ['1 luồng tự động trọn vẹn', 'Chạy trên server của bạn', 'Hướng dẫn theo dõi & bật tắt', 'Bàn giao 1–2 tuần'],
        },
        {
          name: 'Bộ vận hành tự động',
          price: '12 triệu',
          desc: 'Trọn bộ 3–5 luồng: đơn hàng, tin nhắn khách, báo cáo — vận hành hằng ngày gần như tự chạy.',
          features: ['3–5 luồng theo quy trình của bạn', 'Kèm kịch bản ZNS', 'Báo cáo tự động mỗi sáng', 'Bàn giao 3–4 tuần'],
          highlight: true,
        },
        {
          name: 'Thiết kế riêng',
          price: 'từ 20 triệu',
          desc: 'Quy trình phức tạp, nhiều chi nhánh, cần AI xử lý — phân tích và thiết kế theo bài toán.',
          features: ['Khảo sát quy trình miễn phí', 'Gắn AI vào bước cần', 'Nối hệ thống có sẵn', 'Gói duy trì tuỳ chọn'],
        },
      ],
      faqs: [
        { q: 'Tôi có phải trả phí thuê bao hằng tháng không?', a: 'Không bắt buộc — hệ thống dựng trên nền tảng mã nguồn mở đặt ở server của bạn (thuê khoảng 100–300 nghìn/tháng trả nhà cung cấp). Không phí bản quyền, không phụ thuộc dịch vụ nước ngoài.' },
        { q: 'Công cụ tôi đang dùng có nối được không?', a: 'Hầu hết công cụ phổ biến ở VN (Shopee, Lazada, TikTok Shop, Google Sheets, KiotViet, Haravan, Zalo OA…) đều nối được. Buổi tư vấn miễn phí sẽ kiểm tra cụ thể từng công cụ của bạn trước khi báo giá.' },
        { q: 'Luồng tự động bị lỗi thì sao?', a: 'Mỗi luồng có cảnh báo qua Zalo khi chạy lỗi kèm hướng dẫn xử lý nhanh; trong thời gian bảo hành 6 tháng LDK sửa miễn phí. Có gói duy trì nếu bạn muốn có người trực dài hạn.' },
        { q: 'Việc của tôi ít, có đáng tự động hoá không?', a: 'Quy tắc đơn giản: việc nào lặp lại trên 30 phút mỗi ngày là đáng làm. Nếu khảo sát xong thấy chưa đáng tiền, LDK sẽ nói thẳng — tư vấn miễn phí mà.' },
      ],
      relatedProjects: [],
    },
    {
      slug: 'cham-soc-website',
      nav: 'Chăm sóc Website',
      seoTitle: 'Chăm sóc, tăng tốc & cứu website — gói từ 1 triệu/tháng',
      seoDesc: 'Bảo trì định kỳ, tăng tốc web chậm, cứu web lỗi hoặc bị hack, nâng cấp web WordPress cũ. Gói chăm sóc từ 1 triệu/tháng — web luôn có người trực.',
      h1: 'Web của bạn luôn có người trực',
      intro: 'Website làm xong mà không ai chăm thì chậm dần, lỗi dần, rồi một ngày sập đúng lúc khách đông. LDK nhận chăm sóc định kỳ, tăng tốc, và cứu những website đang gặp sự cố — hơn 10 năm làm việc với đủ loại web, từ WordPress tới hệ thống bán hàng lớn.',
      painPoints: [
        'Web chậm rõ rệt nhưng "bên làm web cũ" đã biến mất',
        'Bấm cập nhật xong web vỡ giao diện, không ai sửa',
        'Web bị chèn quảng cáo lạ, Google cảnh báo không an toàn',
        'Muốn đổi banner, thêm bài mà không biết đăng nhập vào đâu',
      ],
      features: [
        { title: 'Trực và giám sát liên tục', desc: 'Web sập là LDK biết trước cả khi khách báo — cảnh báo tự động suốt ngày đêm.' },
        { title: 'Sao lưu định kỳ', desc: 'Bản sao lưu hằng ngày lưu nơi an toàn — có chuyện gì cũng khôi phục được trong giờ.' },
        { title: 'Cập nhật không sợ vỡ', desc: 'Thử trên bản nháp trước, chạy ổn mới đưa lên web thật.' },
        { title: 'Tăng tốc đo được', desc: 'Tối ưu ảnh, bộ nhớ đệm, server — gửi số liệu tốc độ trước–sau rõ ràng.' },
        { title: 'Sửa mọi đời web', desc: 'WordPress, Woo, Magento, web code tay từ 10 năm trước — đều đã gặp và sửa được.' },
        { title: 'Yêu cầu qua Zalo, xong trong ngày', desc: 'Đổi giá, thay banner, đăng bài — nhắn một tin là có người làm.' },
      ],
      samples: [
        { tag: 'Cấp cứu', name: 'Cứu web lỗi, web bị hack', desc: 'Khôi phục hoạt động, gỡ mã độc, vá lỗ hổng, dựng sao lưu để không tái diễn.' },
        { tag: 'Tốc độ', name: 'Tăng tốc web chậm', desc: 'Tối ưu ảnh, bộ nhớ đệm, server — điểm tốc độ Google cải thiện thấy rõ.' },
        { tag: 'Nâng cấp', name: 'Làm mới web WordPress cũ', desc: 'Giữ nội dung và thứ hạng Google, thay giao diện mới, gỡ plugin thừa.' },
        { tag: 'Định kỳ', name: 'Gói chăm sóc hằng tháng', desc: 'Cập nhật, sao lưu, giám sát, sửa lỗi nhỏ — như có nhân viên kỹ thuật riêng.' },
        { tag: 'Chuyển nhà', name: 'Chuyển hosting, đổi tên miền', desc: 'Dọn sang hosting tốt hơn — không rớt web, không mất thứ hạng Google.' },
        { tag: 'Nội dung', name: 'Cập nhật nội dung thuê ngoài', desc: 'Gửi Zalo là có người đăng bài, đổi giá, thay hình — không cần thuê người riêng.' },
      ],
      tiers: [
        {
          name: 'Sửa theo lần',
          price: 'từ 2 triệu',
          desc: 'Cứu web lỗi, gỡ hack, sửa một hạng mục cụ thể — báo giá trước khi làm.',
          features: ['Chẩn đoán miễn phí', 'Báo giá trước, làm sau', 'Bảo hành phần đã sửa', 'Xử lý trong 1–5 ngày'],
        },
        {
          name: 'Gói chăm sóc tháng',
          price: '1 triệu/tháng',
          desc: 'Giám sát, sao lưu, cập nhật, sửa lỗi nhỏ và chỉnh nội dung theo yêu cầu qua Zalo.',
          features: ['Giám sát + sao lưu hằng ngày', 'Cập nhật an toàn định kỳ', '4 yêu cầu chỉnh sửa/tháng', 'Không ràng buộc dài hạn'],
          highlight: true,
        },
        {
          name: 'Đại tu & tăng tốc',
          price: 'từ 8 triệu',
          desc: 'Web cũ chậm, nặng, rối — dọn lại toàn bộ: tốc độ, bảo mật, giao diện, chuẩn SEO.',
          features: ['Đo đạc trước–sau rõ ràng', 'Giữ nội dung & thứ hạng', 'Tuỳ chọn thay giao diện mới', 'Bàn giao 2–4 tuần'],
        },
      ],
      faqs: [
        { q: 'Web do bên khác làm, LDK có nhận chăm không?', a: 'Nhận — đa số web LDK đang chăm đều do bên khác làm. Chỉ cần quyền truy cập hosting; nếu bạn không còn thông tin đăng nhập, LDK hướng dẫn lấy lại qua nhà cung cấp tên miền/hosting.' },
        { q: 'Gói tháng có ràng buộc hợp đồng dài hạn không?', a: 'Không — trả theo tháng, dừng lúc nào cũng được. Trước khi dừng, LDK bàn giao đầy đủ bản sao lưu và tài liệu để bên khác tiếp quản được ngay.' },
        { q: 'Web bị hack có cứu được không, mất bao lâu?', a: 'Hầu hết trường hợp cứu được trong 1–3 ngày: khôi phục từ bản sạch, gỡ mã độc, vá lỗ hổng và đổi toàn bộ mật khẩu. Sau đó nên duy trì gói chăm sóc để không tái diễn.' },
        { q: '4 yêu cầu chỉnh sửa/tháng gồm những gì?', a: 'Các việc dưới 30 phút: đổi banner, đăng bài, sửa giá, thêm mục menu… Việc lớn hơn (thêm tính năng, làm trang mới) sẽ báo giá riêng, minh bạch trước khi làm.' },
      ],
      relatedProjects: ['Ciga.fr', 'Controllermodz'],
    },
  ] satisfies ServicePageData[],

  // ── Trang chi tiết dự án — nội dung ĐỊNH TÍNH, không bịa số liệu kết quả.
  // Số liệu thật + permission khách sẽ nâng lên case study sau (hạng mục đang hoãn).
  projectDetails: [
    {
      slug: 'foodmap',
      name: 'FoodMap',
      seoTitle: 'FoodMap — sàn TMĐT nông sản Việt | Dự án LDK Tech',
      seoDesc:
        'Câu chuyện xây dựng FoodMap — sàn thương mại điện tử nông sản: danh mục ngàn sản phẩm, đặt hàng và thanh toán online, tối ưu cho người mua trên điện thoại.',
      h1: 'FoodMap — đưa nông sản Việt lên sàn online',
      summary:
        'Sàn thương mại điện tử kết nối nông sản từ nhà sản xuất đến người mua — một trong những dự án quy mô lớn và dài hơi nhất LDK từng tham gia.',
      context: [
        'Nông sản Việt chất lượng cao nhưng đường ra thị trường thường qua nhiều tầng trung gian. Đội ngũ FoodMap muốn một sàn chuyên biệt nơi người mua đặt trực tiếp từ nhà sản xuất — nghĩa là danh mục hàng ngàn sản phẩm, nhiều nhà bán cùng lúc, và luồng đơn hàng phức tạp hơn hẳn một web bán hàng đơn thương hiệu.',
        'Thách thức lớn nhất: người mua chủ yếu dùng điện thoại, ở cả thành thị lẫn vùng có mạng chậm — giao diện phải nhẹ, nhanh và dễ dùng với người không rành công nghệ.',
      ],
      scope: [
        'Phát triển giao diện sàn: danh mục ngàn sản phẩm, tìm kiếm và lọc theo vùng miền, trang gian hàng của từng nhà bán',
        'Luồng giỏ hàng — đặt hàng — thanh toán online trọn vẹn trên điện thoại',
        'Tối ưu tốc độ tải cho danh mục nhiều hình ảnh trên mạng di động',
        'Làm việc trực tiếp trong đội ngũ phát triển của FoodMap theo nhịp phát hành liên tục',
      ],
      outcome: [
        'Sàn vận hành thương mại thật với danh mục nông sản đa dạng từ nhiều nhà cung cấp',
        'Trải nghiệm mua hàng mượt trên điện thoại — đúng thói quen của người mua Việt',
        'Nền tảng đủ vững để đội ngũ FoodMap tiếp tục mở rộng tính năng về sau',
      ],
      services: ['web-app', 'thiet-ke-website'],
    },
    {
      slug: 'native',
      name: 'Native',
      seoTitle: 'Native — nền tảng đặt tour du lịch | Dự án LDK Tech',
      seoDesc:
        'LDK phát triển nền tảng đặt tour và trải nghiệm du lịch Native: tìm kiếm, đặt chỗ, thanh toán online — giao diện mobile-first cho khách du lịch.',
      h1: 'Native — đặt tour du lịch ngay trên điện thoại',
      summary:
        'Nền tảng đặt tour và trải nghiệm du lịch: khách tìm, chọn, giữ chỗ và thanh toán trong một mạch — không phải gọi điện qua lại.',
      context: [
        'Đặt tour kiểu cũ nhiều ma sát: khách nhắn tin hỏi lịch, chờ xác nhận chỗ, chuyển khoản rồi chụp màn hình. Native muốn cả hành trình đó diễn ra trực tuyến — xem lịch trống thật, giữ chỗ ngay, thanh toán xong là có xác nhận.',
        'Khách du lịch thao tác chủ yếu trên điện thoại, thường ngay trước hoặc trong chuyến đi — tốc độ và sự rõ ràng của từng bước đặt chỗ quyết định họ có hoàn tất đơn hay không.',
      ],
      scope: [
        'Xây dựng website giới thiệu và nền tảng đặt chỗ trên cùng một hệ thống',
        'Luồng tìm kiếm tour, xem lịch trống, giữ chỗ và thanh toán online',
        'Giao diện mobile-first cho khách thao tác một tay khi đang di chuyển',
      ],
      outcome: [
        'Khách tự hoàn tất việc đặt tour không cần nhắn tin xác nhận thủ công',
        'Một hệ thống phục vụ cả trang giới thiệu lẫn vận hành đặt chỗ — đỡ chi phí duy trì hai nơi',
      ],
      services: ['web-app', 'mobile-app'],
    },
    {
      slug: 'build-to-rent',
      name: 'Build-to-Rent',
      seoTitle: 'Build-to-Rent — web app quản lý cho thuê nhà | LDK Tech',
      seoDesc:
        'Web app quản lý cho thuê bất động sản: danh sách căn hộ, đặt lịch xem nhà, trang quản trị chủ đầu tư — LDK đảm nhận cả giao diện lẫn hệ thống phía sau.',
      h1: 'Build-to-Rent — quản lý cho thuê không cần sổ sách',
      summary:
        'Web app cho mô hình xây-để-cho-thuê: người thuê tìm căn hộ và đặt lịch xem nhà online, chủ đầu tư theo dõi toàn bộ danh mục trên một trang quản trị.',
      context: [
        'Quản lý hàng loạt căn hộ cho thuê bằng bảng tính rất nhanh vỡ trận: căn nào trống, lịch xem nhà lúc nào, hồ sơ người thuê ra sao — mỗi thứ một file. Chủ đầu tư cần một hệ thống duy nhất cho cả người thuê lẫn đội vận hành.',
      ],
      scope: [
        'Website danh sách căn hộ với bộ lọc theo nhu cầu người thuê',
        'Luồng đặt lịch xem nhà trực tuyến gắn với lịch của đội vận hành',
        'Trang quản trị cho chủ đầu tư: tình trạng từng căn, lịch hẹn, hồ sơ quan tâm',
        'Phát triển cả giao diện lẫn hệ thống phía sau (Node.js)',
      ],
      outcome: [
        'Toàn bộ vòng cho thuê — từ tìm căn đến hẹn xem nhà — diễn ra trên một hệ thống',
        'Đội vận hành và chủ đầu tư nhìn cùng một nguồn dữ liệu, hết cảnh lệch file',
      ],
      services: ['web-app'],
    },
    {
      slug: 'controllermodz',
      name: 'Controllermodz',
      seoTitle: 'Controllermodz — web bán tay cầm game tại Anh | LDK Tech',
      seoDesc:
        'Cửa hàng online bán tay cầm game custom cho thị trường Anh: khách tự cấu hình sản phẩm theo ý ngay trên web trước khi đặt — LDK phát triển và tối ưu chuyển đổi.',
      h1: 'Controllermodz — tay cầm game "độ" theo ý khách',
      summary:
        'E-commerce cho thị trường Anh với điểm khó riêng: mỗi sản phẩm là một bản phối màu – nút – cần khách tự chọn, thấy trước thành phẩm rồi mới đặt.',
      context: [
        'Bán tay cầm game custom khác hẳn bán hàng thường: giá trị nằm ở việc khách được tự thiết kế. Bài toán là một trình cấu hình sản phẩm trực quan — chọn tới đâu thấy hình và giá đổi tới đó — chạy mượt ngay trong trang bán hàng.',
      ],
      scope: [
        'Phát triển cửa hàng trên nền Magento cho thị trường Anh',
        'Trình cấu hình sản phẩm: khách phối màu, chọn linh kiện, thấy giá cập nhật trực tiếp',
        'Tối ưu luồng từ trang sản phẩm đến thanh toán để tăng tỉ lệ chốt đơn',
      ],
      outcome: [
        'Khách tự thiết kế sản phẩm và đặt hàng không cần trao đổi thủ công',
        'Cửa hàng phục vụ khách quốc tế với quy trình đặt — thanh toán hoàn chỉnh',
      ],
      services: ['thiet-ke-website', 'cham-soc-website'],
    },
    {
      slug: 'ciga-fr',
      name: 'Ciga.fr',
      seoTitle: 'Ciga.fr — website bán hàng thị trường Pháp | LDK Tech',
      seoDesc:
        'Storefront thương mại điện tử tiếng Pháp: giỏ hàng, thanh toán, quản lý đơn — LDK phát triển và duy trì vận hành ổn định trong nhiều năm liền.',
      h1: 'Ciga.fr — cửa hàng online bền bỉ tại thị trường Pháp',
      summary:
        'Website bán hàng cho thị trường Pháp trên nền PrestaShop — minh chứng cho kiểu hợp tác LDK theo đuổi: làm xong không rời đi, mà đồng hành vận hành nhiều năm.',
      context: [
        'Một cửa hàng online sống được nhiều năm cần hơn là code tốt lúc bàn giao: cập nhật bảo mật đều đặn, xử lý sự cố nhanh, và nâng cấp dần theo nhu cầu bán hàng thực tế. Ciga.fr là dự án LDK đảm nhận trọn vòng đời như vậy.',
      ],
      scope: [
        'Phát triển storefront PrestaShop: danh mục, giỏ hàng, thanh toán, quản lý đơn',
        'Tuỳ biến giao diện và tính năng theo nhu cầu bán hàng từng giai đoạn',
        'Bảo trì, cập nhật bảo mật và xử lý sự cố trong suốt quá trình vận hành',
      ],
      outcome: [
        'Cửa hàng vận hành ổn định phục vụ khách Pháp trong nhiều năm liên tục',
        'Chủ shop tập trung bán hàng — phần kỹ thuật có LDK trực dài hạn',
      ],
      services: ['thiet-ke-website', 'cham-soc-website'],
    },
    {
      slug: 'treehouse',
      name: 'Treehouse',
      seoTitle: 'Treehouse — nền tảng fintech Singapore | Dự án LDK Tech',
      seoDesc:
        'Tham gia nền tảng tài chính số hoá tài sản tại Singapore: phụ trách toàn bộ giao diện trong đội ngũ 8 kỹ sư — dashboard dữ liệu cập nhật thời gian thực.',
      h1: 'Treehouse — giao diện cho nền tảng tài chính số',
      summary:
        'Nền tảng fintech số hoá tài sản tại Singapore — LDK phụ trách toàn bộ phần giao diện, phối hợp hằng ngày cùng đội ngũ 8 kỹ sư quốc tế.',
      context: [
        'Sản phẩm tài chính đòi hỏi giao diện ở một chuẩn khác: số liệu cập nhật liên tục không được sai lệch, biểu đồ dày đặc vẫn phải đọc được, và mọi thay đổi đều qua quy trình kiểm duyệt chặt của đội ngũ quốc tế.',
      ],
      scope: [
        'Phụ trách toàn bộ phần giao diện của nền tảng',
        'Dashboard hiển thị dữ liệu tài sản cập nhật thời gian thực',
        'Phối hợp quy trình phát triển chuẩn quốc tế: review chéo, kiểm thử, phát hành liên tục',
      ],
      outcome: [
        'Giao diện đạt chuẩn vận hành của một sản phẩm tài chính đang phục vụ nhà đầu tư',
        'Kinh nghiệm quy trình quốc tế được LDK áp dụng lại cho mọi dự án trong nước',
      ],
      services: ['web-app'],
    },
  ] satisfies ProjectDetail[],

  // ── Landing giải pháp theo ngành — chữ "Giải pháp" dùng đúng chỗ đã chốt naming ──
  industryPages: [
    {
      slug: 'spa-lam-dep',
      nav: 'Spa & Làm đẹp',
      seoTitle: 'Giải pháp cho spa, salon: đặt lịch online, giữ khách quen',
      seoDesc:
        'Bộ giải pháp cho spa, salon, nail: website chuẩn SEO, mini app đặt lịch trên Zalo, nhắc hẹn tự động, thẻ thành viên tích điểm. Bắt đầu chỉ từ 5 triệu.',
      h1: 'Giải pháp số cho spa & làm đẹp',
      intro:
        'Khách của ngành làm đẹp đến từ hai nơi: tìm "spa gần đây" trên Google, và người quen giới thiệu qua Zalo. Bộ giải pháp này giúp bạn đón cả hai — rồi giữ họ quay lại đều bằng đặt lịch tiện và chăm sóc tự động.',
      painPoints: [
        'Khách nhắn đặt lịch lúc đang bận tay, quên trả lời là mất khách',
        'Khách quên lịch hẹn — ghế trống mà không kịp lấp',
        'Tìm "spa gần đây" trên Google thì chỉ thấy đối thủ',
        'Khách làm một lần rồi thôi — không có gì kéo họ quay lại',
      ],
      solutions: [
        {
          title: 'Website spa chuẩn SEO',
          desc: 'Bảng giá dịch vụ, hình ảnh không gian, đánh giá của khách — người tìm trên Google thấy bạn trước và đủ tin để đặt lịch.',
          serviceSlug: 'thiet-ke-website',
          from: 'từ 5 triệu',
        },
        {
          title: 'Mini app đặt lịch trên Zalo',
          desc: 'Khách chọn dịch vụ, chọn giờ ngay trong Zalo; hệ thống nhắc hẹn tự động qua ZNS — giảm hẳn khách quên lịch.',
          serviceSlug: 'zalo-mini-app',
          from: 'từ 15 triệu',
        },
        {
          title: 'Chăm sóc khách tự động',
          desc: 'Tích điểm, ưu đãi sinh nhật, nhắc liệu trình định kỳ — chạy tự động, khách quay lại đều mà bạn không phải nhớ.',
          serviceSlug: 'tu-dong-hoa',
          from: 'từ 5 triệu',
        },
      ],
      roadmap: [
        { stage: 'Bắt đầu', desc: 'Website + Google Maps để khách mới tìm thấy bạn — nền móng chỉ từ 5 triệu.' },
        { stage: 'Tăng trưởng', desc: 'Thêm mini app đặt lịch + nhắc hẹn ZNS khi lượng khách đặt qua Zalo đã đều.' },
        { stage: 'Giữ khách', desc: 'Bật thẻ thành viên và kịch bản chăm sóc tự động — biến khách vãng lai thành khách quen.' },
      ],
      faqs: [
        {
          q: 'Spa nhỏ 2–3 giường có cần làm không?',
          a: 'Càng nhỏ càng cần khách tự đặt lịch — vì bạn không có lễ tân riêng để trực tin nhắn. Bắt đầu từ website 5 triệu là đủ để khách tìm thấy và nhắn Zalo cho bạn; mini app tính sau khi khách đông.',
        },
        {
          q: 'Tôi đang dùng sổ giấy quản lý lịch hẹn, chuyển đổi có khó không?',
          a: 'Không — hệ thống được thiết kế cho người quen dùng Zalo là chính: lịch hẹn mới báo thẳng về điện thoại của bạn, bạn xác nhận một chạm. Sổ giấy vẫn dùng song song được trong thời gian làm quen.',
        },
        {
          q: 'Nhắc hẹn tự động qua ZNS tốn bao nhiêu?',
          a: 'Phí ZNS trả trực tiếp cho Zalo theo từng tin (vài trăm đồng/tin). Một spa cỡ vừa thường tốn dưới 200 nghìn/tháng — rẻ hơn nhiều so với một ghế trống vì khách quên lịch.',
        },
        {
          q: 'Mất bao lâu để chạy được cả bộ?',
          a: 'Website: 2–3 tuần. Mini app đặt lịch: thêm 3–5 tuần. Bạn không cần làm tất cả cùng lúc — lộ trình chia giai đoạn để mỗi phần tự chứng minh hiệu quả trước khi đầu tư phần sau.',
        },
      ],
      sampleTags: ['Làm đẹp'],
      demoSlug: 'spa-dat-lich',
    },
    {
      slug: 'quan-an-cafe',
      nav: 'Quán ăn & Cà phê',
      seoTitle: 'Giải pháp cho quán ăn, cà phê: gọi món QR, đặt bàn online',
      seoDesc:
        'Bộ giải pháp cho nhà hàng, quán ăn, quán cà phê: website có menu và đặt bàn, gọi món QR tại bàn, kênh đặt giao riêng không mất phí sàn. Từ 5 triệu.',
      h1: 'Giải pháp số cho quán ăn & cà phê',
      intro:
        'Quán đông khách chưa chắc lời nhiều: phí sàn giao đồ ăn, nhân viên chạy không kịp order giờ cao điểm, khách mới không tìm thấy quán trên Google. Bộ giải pháp này xử từng chỗ rò rỉ đó.',
      painPoints: [
        'Giờ cao điểm nhân viên chạy không kịp ghi order, sai món mất khách',
        'Khách gọi điện đặt bàn — quên ghi, trùng bàn, mất uy tín',
        'Bán qua ứng dụng giao đồ ăn thì phí chiết khấu ăn gần hết lời',
        'Menu in giấy — đổi giá, thêm món là in lại cả xấp',
      ],
      solutions: [
        {
          title: 'Website quán có menu & đặt bàn',
          desc: 'Khách tìm "quán ngon gần đây" là thấy bạn: menu, hình món, giờ mở cửa, đặt bàn online và chỉ đường một chạm.',
          serviceSlug: 'thiet-ke-website',
          from: 'từ 5 triệu',
        },
        {
          title: 'Gọi món QR tại bàn',
          desc: 'Khách quét mã ở bàn, tự chọn món, order chạy thẳng xuống quầy — nhân viên chỉ việc bưng ra, giờ cao điểm không loạn.',
          serviceSlug: 'zalo-mini-app',
          from: 'từ 15 triệu',
        },
        {
          title: 'Kênh đặt giao riêng + vận hành tự động',
          desc: 'Nhận đơn giao tận nơi qua kênh của chính bạn — không mất phí chiết khấu; đơn và doanh thu tự tổng hợp mỗi ngày.',
          serviceSlug: 'tu-dong-hoa',
          from: 'từ 5 triệu',
        },
      ],
      roadmap: [
        { stage: 'Bắt đầu', desc: 'Website menu + Google Maps — khách mới tìm thấy quán, khách cũ xem menu trước khi đến.' },
        { stage: 'Tăng trưởng', desc: 'Gọi món QR tại bàn khi quán đông — giảm sai sót, quay vòng bàn nhanh hơn.' },
        { stage: 'Tối ưu lời', desc: 'Mở kênh đặt giao riêng cho khách quen — mỗi đơn không mất phí sàn là thêm phần lời giữ lại.' },
      ],
      faqs: [
        {
          q: 'Gọi món QR có làm mất "chất" phục vụ của quán không?',
          a: 'QR thay phần ghi order, không thay con người — nhân viên vẫn chào khách, tư vấn món, bưng đồ. Khác biệt là hết cảnh đứng chờ ghi món giờ cao điểm và không còn sai order do nghe nhầm.',
        },
        {
          q: 'Khách lớn tuổi không quen quét QR thì sao?',
          a: 'Menu giấy và gọi nhân viên vẫn hoạt động bình thường — QR là thêm lựa chọn chứ không thay thế. Thực tế nhóm khách trẻ dùng QR trước, giải phóng nhân viên để chăm nhóm khách cần hỗ trợ.',
        },
        {
          q: 'Tôi vẫn muốn bán trên các ứng dụng giao đồ ăn, có mâu thuẫn không?',
          a: 'Không — cứ giữ các ứng dụng đó để tiếp cận khách mới. Kênh riêng dùng cho khách quen đặt lại: mã giảm nhẹ hơn phí sàn là cả bạn lẫn khách đều lợi hơn.',
        },
      ],
      sampleTags: ['F&B'],
      demoSlug: 'goi-mon-qr',
    },
    {
      slug: 'cua-hang-ban-le',
      nav: 'Cửa hàng bán lẻ',
      seoTitle: 'Giải pháp cho cửa hàng bán lẻ: bán online, giữ khách quen',
      seoDesc:
        'Bộ giải pháp cho shop thời trang, mỹ phẩm, tạp hoá đặc sản: web bán hàng riêng, thẻ thành viên trên Zalo, gom đơn sàn về một chỗ. Bắt đầu từ 5 triệu.',
      h1: 'Giải pháp số cho cửa hàng bán lẻ',
      intro:
        'Bán trên sàn thì bị so giá từng đồng và mất phí; bán qua Zalo thì chốt tay từng đơn. Bộ giải pháp này cho shop một kênh bán riêng đàng hoàng — và biến tệp khách đã mua thành khách quay lại.',
      painPoints: [
        'Phí sàn + chạy khuyến mãi liên tục — doanh thu cao mà lời mỏng',
        'Khách quen nhắn Zalo đặt hàng, phải chốt tay từng đơn một',
        'Tồn kho trên bảng tính lệch với kho thật, đối soát mỗi tuần một lần',
        'Có cả nghìn khách đã mua nhưng không có cách nào mời họ quay lại',
      ],
      solutions: [
        {
          title: 'Web bán hàng của riêng shop',
          desc: 'Catalog, giỏ hàng, thanh toán, kết nối vận chuyển — kênh bán đứng tên bạn, không phí chiết khấu, không bị so giá.',
          serviceSlug: 'thiet-ke-website',
          from: 'từ 15 triệu',
        },
        {
          title: 'Thẻ thành viên trên Zalo',
          desc: 'Khách mua là có điểm, đổi ưu đãi ngay trong Zalo; shop gửi ZNS khuyến mãi đúng tệp khách cũ — chi phí thấp hơn quảng cáo nhiều.',
          serviceSlug: 'zalo-mini-app',
          from: 'từ 15 triệu',
        },
        {
          title: 'Gom đơn mọi kênh về một chỗ',
          desc: 'Đơn từ sàn, web, Zalo đổ về một bảng — tự trừ kho, tự báo cáo doanh thu từng kênh mỗi tối.',
          serviceSlug: 'tu-dong-hoa',
          from: 'từ 5 triệu',
        },
      ],
      roadmap: [
        { stage: 'Bắt đầu', desc: 'Gom đơn sàn về một chỗ + tự động trừ kho — dẹp ngay việc tay tốn nhất, chỉ từ 5 triệu.' },
        { stage: 'Kênh riêng', desc: 'Web bán hàng đứng tên shop — thoát dần phụ thuộc phí sàn.' },
        { stage: 'Giữ khách', desc: 'Thẻ thành viên + ZNS ưu đãi cho khách cũ — mỗi khách mua lại là một đơn không mất phí tìm khách.' },
      ],
      faqs: [
        {
          q: 'Tôi đang dùng phần mềm bán hàng ở quầy, có phải bỏ không?',
          a: 'Không — các phần mềm quầy phổ biến ở Việt Nam đều nối được: web và mini app đọc chung tồn kho, đơn online tự trừ vào cùng hệ thống. Buổi tư vấn miễn phí sẽ kiểm tra phần mềm bạn đang dùng.',
        },
        {
          q: 'Web bán hàng riêng liệu có ai vào mua không?',
          a: 'Web riêng không thay sàn ngay — nó bắt đầu từ tệp khách bạn đã có: khách Zalo, khách tại quầy, người theo dõi mạng xã hội. Mua trên web của bạn được tích điểm và giá tốt hơn là lý do họ chuyển kênh.',
        },
        {
          q: 'Ngân sách dưới 10 triệu nên bắt đầu từ đâu?',
          a: 'Từ chỗ đau nhất. Nếu mỗi ngày mất một giờ chép đơn sàn — làm luồng gom đơn (từ 5 triệu). Nếu khách hỏi mà không có chỗ xem hàng đàng hoàng — làm web giới thiệu trước (từ 5 triệu), nâng lên bán hàng sau.',
        },
      ],
      sampleTags: ['Bán lẻ', 'TMĐT'],
    },
  ] satisfies IndustryPage[],

  // ── Demo sống — thương hiệu HƯ CẤU, dữ liệu minh hoạ ──
  demoPages: [
    {
      slug: 'spa-dat-lich',
      kind: 'mini-app',
      name: 'An Nhiên',
      seoTitle: 'Demo mini app đặt lịch spa — bấm thử trực tiếp',
      seoDesc:
        'Bản demo tương tác mini app đặt lịch cho spa, salon: chọn dịch vụ, chọn giờ, xác nhận hẹn, thẻ thành viên tích điểm. Dữ liệu minh hoạ — bấm thử ngay.',
      tagline: 'Mini app đặt lịch cho spa & salon',
      serviceSlug: 'zalo-mini-app',
      from: 'từ 15 triệu',
    },
    {
      slug: 'website-nha-hang',
      kind: 'website',
      name: 'Bếp Quê',
      seoTitle: 'Demo website nhà hàng — bấm thử trực tiếp',
      seoDesc:
        'Bản demo website nhà hàng, quán ăn: thực đơn theo nhóm món, đặt bàn online, thông tin chỉ đường. Dữ liệu minh hoạ — trải nghiệm thử đúng như khách của bạn.',
      tagline: 'Website cho nhà hàng, quán ăn',
      serviceSlug: 'thiet-ke-website',
      from: 'từ 8 triệu',
    },
    {
      slug: 'goi-mon-qr',
      kind: 'web-app',
      name: 'Hạt & Lá',
      seoTitle: 'Demo gọi món QR tại bàn — bấm thử trực tiếp',
      seoDesc:
        'Bản demo gọi món quét QR tại bàn cho quán ăn, cà phê: xem menu, thêm món vào giỏ, gửi order, theo dõi trạng thái pha chế. Dữ liệu minh hoạ — bấm thử ngay.',
      tagline: 'Gọi món QR cho quán ăn & cà phê',
      serviceSlug: 'zalo-mini-app',
      from: 'từ 15 triệu',
    },
  ] satisfies DemoPage[],

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
    heading: 'Kể LDK Tech nghe bài toán của bạn',
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
    about: 'LDK Tech Solutions — đơn vị phát triển phần mềm cho hộ kinh doanh và doanh nghiệp SME Việt Nam: website, ứng dụng, trợ lý AI và tự động hoá vận hành. Đồng hành từ bản kế hoạch đầu tiên đến từng phiên bản nâng cấp.',
    // Năm cố định để HTML prerender và client khớp nhau (tránh hydration mismatch)
    copyright: '© 2026 LDK Tech Solutions.',
  },
} as const
