import { Link } from 'react-router'
import type { Project } from '@/content/site'

/** Card một dự án — dùng ở Portfolio (home), trang Dự án và "dự án liên quan" trên trang dịch vụ */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-paper p-5 shadow-brutal-sm transition-transform hover:-translate-y-1">
      <span className="self-start rounded-md border-2 border-ink bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
        {project.tag}
      </span>
      <h3 className="mt-3 font-display text-xl font-black uppercase tracking-tight font-expanded">
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
      <p className="mt-4 flex items-baseline justify-between gap-3 border-t border-border pt-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{project.stack}</span>
        <Link
          to={`/du-an/${project.slug}/`}
          className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand decoration-gold decoration-2 underline-offset-4 hover:underline"
        >
          Chi tiết →
        </Link>
      </p>
    </article>
  )
}
