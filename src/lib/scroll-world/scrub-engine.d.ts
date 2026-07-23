/** Engine scroll-world (vendored từ skill oso95/scroll-world) — vanilla JS, tự dựng DOM + CSS trong container. */
export interface ScrollWorldSection {
  id: string
  label: string
  still?: string
  stillMobile?: string
  clip?: string
  clipMobile?: string
  accent?: string
  scroll?: number
  linger?: number
  eyebrow?: string
  title?: string
  body?: string
  tags?: string[]
  cta?: {
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
}

export interface ScrollWorldConfig {
  brand?: { name: string; href?: string }
  diveScroll?: number
  connScroll?: number
  crossfade?: number
  hint?: string
  nav?: boolean
  atmosphere?: boolean
  sections: ScrollWorldSection[]
  connectors?: (string | null)[]
  connectorsMobile?: (string | null)[]
}

export function mountScrollWorld(container: HTMLElement, config: ScrollWorldConfig): void
