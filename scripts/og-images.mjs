// Vẽ ảnh chia sẻ (OG) 1200×630 riêng cho TỪNG trang ra dist/og/<slug>.png.
// Trước đây cả site dùng chung /og-image.png nên gửi link trang nào lên Zalo cũng ra một tấm.
// satori dựng layout flexbox -> SVG (chữ đã thành path), resvg đổi SVG -> PNG.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { createServer } from 'vite'

const root = resolve(import.meta.dirname, '..')
const INK = '#211A3B'
const GOLD = '#F4B400'
const BRAND_RGB = '111, 60, 195' // #6F3CC3 — --color-brand, để dạng rgb vì quầng cần alpha

// Be Vietnam Pro chia theo subset nên phải nạp cả 3: dấu tiếng Việt nằm ở subset
// "vietnamese", chữ cái cơ bản ở "latin". satori tự lùi sang font sau khi thiếu glyph,
// nên thứ tự vietnamese -> latin-ext -> latin là bắt buộc.
// (Archivo chỉ có .woff2 mà satori không đọc được, nên thẻ dùng Be Vietnam Pro 800.)
const FONT_DIR = resolve(root, 'node_modules/@fontsource/be-vietnam-pro/files')
const face = (subset, weight) => ({
  data: readFileSync(resolve(FONT_DIR, `be-vietnam-pro-${subset}-${weight}-normal.woff`)),
  weight,
  style: 'normal',
})
const fonts = [
  { name: 'BVPvi', ...face('vietnamese', 400) },
  { name: 'BVPvi', ...face('vietnamese', 800) },
  { name: 'BVPext', ...face('latin-ext', 400) },
  { name: 'BVPext', ...face('latin-ext', 800) },
  { name: 'BVPlatin', ...face('latin', 400) },
  { name: 'BVPlatin', ...face('latin', 800) },
]
const FONT_STACK = 'BVPvi, BVPext, BVPlatin'

const logoSvg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf-8')
const logoUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

/** satori nhận element kiểu React — tạo bằng object literal để script khỏi cần build JSX */
const el = (type, style, children) => ({ type, props: { style, children } })
const text = (style, value) => el('div', { display: 'flex', ...style }, value)
/** img cần src ở props chứ không phải style, nên không dùng chung helper el() */
const img = (src, size, style) => ({ type: 'img', props: { src, width: size, height: size, style } })

/** Lưới kẻ ô mờ — cùng ngôn ngữ thị giác với nền bg-blueprint của website */
function blueprint() {
  const lines = []
  const hair = { position: 'absolute', backgroundColor: '#FFFFFF', opacity: 0.06 }
  for (let x = 60; x < 1200; x += 60) {
    lines.push(el('div', { ...hair, left: x, top: 0, width: 1, height: 630 }))
  }
  for (let y = 60; y < 630; y += 60) {
    lines.push(el('div', { ...hair, left: 0, top: y, width: 1200, height: 1 }))
  }
  return el('div', { position: 'absolute', inset: 0, display: 'flex' }, lines)
}

function card({ eyebrow, headline, commitments }) {
  // Tiêu đề dài thì hạ cỡ chữ để luôn gọn trong 3 dòng, không tràn khỏi thẻ
  const fontSize = headline.length > 48 ? 54 : headline.length > 34 ? 60 : 68

  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: INK,
      color: '#FFFFFF',
      fontFamily: FONT_STACK,
    },
    [
      blueprint(),
      // Quầng tím tràn mép phải tạo chiều sâu. Dùng radial-gradient chứ không phải hình tròn
      // đặc: mép cứng của hình tròn cắt ngang chữ tiêu đề nhìn rất thô.
      el('div', {
        position: 'absolute',
        right: -300,
        top: -320,
        width: 980,
        height: 980,
        backgroundImage: `radial-gradient(circle at center, rgba(${BRAND_RGB}, 0.85) 0%, rgba(${BRAND_RGB}, 0.34) 45%, rgba(${BRAND_RGB}, 0) 72%)`,
      }),
      el('div', { position: 'absolute', left: 0, top: 0, width: 1200, height: 12, backgroundColor: GOLD }),
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          width: 1200,
          height: 630,
          padding: '76px 80px 64px',
        },
        [
          // Hàng thương hiệu
          el(
            'div',
            { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 1040 },
            [
              el('div', { display: 'flex', alignItems: 'center' }, [
                img(logoUri, 52, { borderRadius: 12 }),
                text(
                  {
                    marginLeft: 18,
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  },
                  'LDK Tech',
                ),
              ]),
              text({ fontSize: 22, color: 'rgba(255,255,255,0.55)' }, 'ldktech.com'),
            ],
          ),

          // Khối nội dung chính
          el('div', { display: 'flex', flexDirection: 'column', width: 1040 }, [
            text(
              {
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: GOLD,
              },
              eyebrow,
            ),
            text(
              {
                marginTop: 20,
                fontSize,
                fontWeight: 800,
                lineHeight: 1.16,
                letterSpacing: -0.5,
              },
              headline,
            ),
          ]),

          // Cam kết — đúng ba dòng chữ đang đặt dưới nút CTA ngoài trang chủ
          el(
            'div',
            { display: 'flex', alignItems: 'center', width: 1040 },
            commitments.map((item, i) =>
              el(
                'div',
                { display: 'flex', alignItems: 'center', marginRight: i === commitments.length - 1 ? 0 : 14 },
                [
                  text(
                    {
                      border: `2px solid rgba(255,255,255,0.28)`,
                      borderRadius: 10,
                      padding: '10px 18px',
                      fontSize: 22,
                      color: 'rgba(255,255,255,0.88)',
                    },
                    item,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    ],
  )
}

async function toPng(element, width) {
  const svg = await satori(element, { width, height: width === 1200 ? 630 : width, fonts })
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()
}

const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
  logLevel: 'error',
})

try {
  const { ROUTES, NOT_FOUND_META } = await server.ssrLoadModule('/src/content/routes.ts')
  const { ogEyebrow, ogHeadline, OG_SIZE } = await server.ssrLoadModule('/src/lib/og.ts')
  const { SITE } = await server.ssrLoadModule('/src/content/site.ts')

  const outDir = resolve(root, 'dist/og')
  mkdirSync(outDir, { recursive: true })

  const targets = [...ROUTES, NOT_FOUND_META]
  for (const route of targets) {
    const png = await toPng(
      card({
        eyebrow: ogEyebrow(route.path),
        headline: ogHeadline(route.title),
        commitments: SITE.hero.commitments,
      }),
      OG_SIZE.width,
    )
    writeFileSync(resolve(root, `dist${route.ogImage}`), png)
  }

  // Icon khi khách lưu website ra màn hình chính iPhone (favicon.svg đã có nền vàng)
  const icon = new Resvg(logoSvg, { fitTo: { mode: 'width', value: 180 } }).render().asPng()
  writeFileSync(resolve(root, 'dist/apple-touch-icon.png'), icon)

  console.log(`✓ Vẽ ${targets.length} ảnh chia sẻ + apple-touch-icon`)
} finally {
  await server.close()
}

process.exit(0)
