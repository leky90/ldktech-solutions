import { renderToString } from 'react-dom/server'
import App from './App.tsx'

/**
 * Entry chỉ dùng lúc build (scripts/prerender.mjs) — không nằm trong bundle client.
 * Trả về HTML tĩnh của toàn trang để chèn vào dist/index.html cho SEO.
 */
export function prerender(): { html: string } {
  return { html: renderToString(<App />) }
}
