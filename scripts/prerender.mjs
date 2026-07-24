// Prerender sau build: render TỪNG ROUTE trong manifest thành HTML tĩnh riêng
// (dist/<path>/index.html) với title/description/canonical/OG riêng, và generate sitemap.xml.
// Tự viết thay vì dùng plugin để process luôn exit sạch trong CI.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = resolve(import.meta.dirname, '..')
const distIndex = resolve(root, 'dist/index.html')

const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
  logLevel: 'error',
})

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

try {
  const { prerender } = await server.ssrLoadModule('/src/prerender-entry.tsx')
  const { ROUTES, NOT_FOUND_META } = await server.ssrLoadModule('/src/content/routes.ts')
  const { SITE } = await server.ssrLoadModule('/src/content/site.ts')

  const template = readFileSync(distIndex, 'utf-8')
  const marker = '<div id="root">'
  if (!template.includes(marker)) {
    throw new Error('Không tìm thấy <div id="root"> trong dist/index.html')
  }
  const origin = SITE.siteUrl.replace(/\/$/, '')

  const renderPage = (route, { noindex = false } = {}) => {
    const { html } = prerender(route.path)
    const url = origin + route.path
    const title = escapeHtml(route.title)
    const desc = escapeHtml(route.description)
    const image = origin + route.ogImage

    const page = template
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
      .replace(/(name="description"[\s\S]*?content=")[^"]*(")/, `$1${desc}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
      .replace(/(property="og:url" content=")[^"]*(")/, `$1${url}$2`)
      .replace(/(property="og:title" content=")[^"]*(")/, `$1${title}$2`)
      .replace(/(property="og:description"[\s\S]*?content=")[^"]*(")/, `$1${desc}$2`)
      .replace(/(property="og:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
      .replace(/(name="twitter:description"[\s\S]*?content=")[^"]*(")/, `$1${desc}$2`)
      .replace(/(name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(marker, marker + html)

    if (!noindex) return page
    // 404.html được phục vụ ở MỌI url sai nên canonical sẽ luôn trỏ sai -> bỏ hẳn,
    // và chặn index để trang lỗi không lọt vào kết quả tìm kiếm.
    return page
      .replace(/[ \t]*<link rel="canonical"[^>]*>\n?/, '')
      .replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
  }

  for (const route of ROUTES) {
    const dir = resolve(root, `dist${route.path}`)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), renderPage(route))
  }

  // Trang 404 thật thay cho bản copy của index.html — trước đây url sai hiện nguyên trang chủ
  writeFileSync(resolve(root, 'dist/404.html'), renderPage(NOT_FOUND_META, { noindex: true }))

  // Sitemap từ cùng manifest — không bao giờ lệch với các trang thật
  const today = new Date().toISOString().slice(0, 10)
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ROUTES.map(
      (r) =>
        `  <url>\n    <loc>${origin + r.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    ).join('\n') +
    '\n</urlset>\n'
  writeFileSync(resolve(root, 'dist/sitemap.xml'), sitemap)

  console.log(`✓ Prerendered ${ROUTES.length} trang + sitemap.xml`)
} finally {
  await server.close()
}

process.exit(0)
