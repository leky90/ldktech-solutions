import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.tsx'

/**
 * Entry chỉ dùng lúc build (scripts/prerender.mjs) — không nằm trong bundle client.
 * Render một route cụ thể thành HTML tĩnh để ghi vào dist/<path>/index.html.
 */
export function prerender(path: string): { html: string } {
  return {
    html: renderToString(
      <StaticRouter location={path}>
        <App />
      </StaticRouter>,
    ),
  }
}
