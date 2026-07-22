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
}

export interface ServiceTier {
  name: string
  price: string
  desc: string
  features: string[]
  highlight?: boolean
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

export const SITE = {
  name: 'LDK Tech Solutions',
  brand: 'LDK Tech',
  tagline: 'Thiết kế Website, App & Zalo Mini App cho hộ kinh doanh và SME',

  // ── URL & liên hệ (1 chỗ duy nhất) ──
  siteUrl: 'https://leky90.github.io/ldktech-solutions/',
  zaloUrl: 'https://zalo.me/0969436154',
  phone: '0969 436 154',
  phoneHref: 'tel:+84969436154',
  email: 'hello@ldktech.vn',
  // URL API nhận lead (tự host, sẽ code sau). Để trống '' -> form ẩn,
  // section liên hệ chỉ hiện kênh Zalo/gọi — không bao giờ dead-end.
  leadApiUrl: '',

  nav: [
    { label: 'Dịch vụ', href: '/dich-vu/' },
    { label: 'Dự án', href: '/du-an/' },
    { label: 'Bảng giá', href: '/bang-gia/' },
    { label: 'FAQ', href: '/#faq' },
  ],

  hero: {
    eyebrow: '~/ldk-tech · thiết kế & phát triển sản phẩm số',
    // H1 giữ đủ keyword SEO chính
    h1Lines: ['Website, App', '& Zalo Mini App', 'cho người kinh doanh.'],
    sub: 'Giá chốt trước khi làm. Bàn giao đúng hẹn. Trao đổi 100% qua Zalo bằng ngôn ngữ dễ hiểu. LDK Tech đồng hành cùng hộ kinh doanh & SME từ ý tưởng đến khi ra đơn hàng đầu tiên — và sau đó nữa.',
    ctaPrimary: 'Chat Zalo ngay',
    ctaSecondary: 'Xem bảng giá',
    // Số liệu thật từ hồ sơ Freelancer.com (@Leky90, từ 2012) + vLance (60 dự án)
    trust: ['180+ dự án từ 2012', '4.9/5★ · 125+ đánh giá trên Freelancer.com', '99% đúng hẹn · 100% đúng ngân sách'],
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

  // Dự án thật từ portfolio Freelancer.com / vLance / LinkedIn
  portfolio: [
    {
      name: 'FoodMap',
      tag: 'Sàn TMĐT nông sản',
      desc: 'Sàn thương mại điện tử kết nối nông sản Việt từ nông trại đến người mua — danh mục ngàn sản phẩm, đặt hàng và thanh toán online.',
      stack: 'React · Web App',
    },
    {
      name: 'Native',
      tag: 'Du lịch & trải nghiệm',
      desc: 'Nền tảng đặt tour và trải nghiệm du lịch: tìm kiếm, đặt chỗ, thanh toán — tối ưu cho khách dùng điện thoại.',
      stack: 'React · Website + Web App',
    },
    {
      name: 'Build-to-Rent',
      tag: 'Bất động sản',
      desc: 'Web app quản lý cho thuê bất động sản: danh sách căn hộ, đặt lịch xem nhà, trang quản trị cho chủ đầu tư.',
      stack: 'React · Node.js · Web App',
    },
    {
      name: 'Controllermodz',
      tag: 'E-commerce (Anh)',
      desc: 'Cửa hàng online bán tay cầm game custom cho thị trường Anh — cấu hình sản phẩm theo ý khách ngay trên web.',
      stack: 'Magento · Website bán hàng',
    },
    {
      name: 'Ciga.fr',
      tag: 'E-commerce (Pháp)',
      desc: 'Storefront thương mại điện tử cho thị trường Pháp: giỏ hàng, thanh toán, quản lý đơn — vận hành ổn định nhiều năm.',
      stack: 'PrestaShop · Website bán hàng',
    },
    {
      name: 'Treehouse',
      tag: 'Fintech (Singapore)',
      desc: 'Nền tảng tài chính số hoá tài sản — dẫn dắt đội 8 kỹ sư xây toàn bộ giao diện: dashboard realtime, dữ liệu on-chain.',
      stack: 'React · Web App · Fintech',
    },
  ] satisfies Project[],

  // Trích nguyên văn review công khai của khách trên vLance.vn
  testimonials: [
    {
      quote: 'Hiện tại đây là người tôi hay hợp tác nhất mỗi khi có dự án gì về lập trình web.',
      author: 'Đỗ Hồng Nam',
      context: 'Khách thuê lặp lại nhiều dự án · vLance',
    },
    {
      quote: 'Kỳ có thể giải quyết được những bài toán tưởng chừng như không thể. Good jobs.',
      author: 'Vietnam Smart BPO',
      context: 'Dự án website doanh nghiệp · vLance',
    },
    {
      quote: 'Một người ít nói, nhưng chắc chắn và trung thực. Hoàn thành công việc được giao đúng hẹn.',
      author: 'Phan Tuấn Phúc',
      context: 'Plugin PDF viewer cho web · vLance',
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
  ] satisfies ServicePageData[],

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
