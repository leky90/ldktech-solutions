// Prerender sau build: render App -> HTML tĩnh, chèn vào dist/index.html.
// Tự viết thay vì dùng plugin để process luôn exit sạch trong CI.
import { readFileSync, writeFileSync } from 'node:fs'
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

try {
  const { prerender } = await server.ssrLoadModule('/src/prerender-entry.tsx')
  const { html } = prerender()

  const template = readFileSync(distIndex, 'utf-8')
  const marker = '<div id="root">'
  if (!template.includes(marker)) {
    throw new Error('Không tìm thấy <div id="root"> trong dist/index.html')
  }
  writeFileSync(distIndex, template.replace(marker, marker + html))
  console.log('✓ Prerendered dist/index.html (%d ký tự HTML)', html.length)
} finally {
  await server.close()
}

process.exit(0)
