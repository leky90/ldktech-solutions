import type { ReactNode } from 'react'

/** Khung điện thoại cho demo mini app / web app — kích thước cố định, cuộn bên trong */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[2.6rem] border-2 border-ink bg-ink p-2 shadow-brutal">
      <div className="relative flex h-[620px] flex-col overflow-hidden rounded-[2rem] bg-white">
        {/* Thanh trạng thái giả lập */}
        <div className="flex items-center justify-between px-6 pb-1 pt-2.5 font-mono text-[10px] font-bold text-ink">
          <span>9:41</span>
          <span aria-hidden="true" className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
          <span className="tracking-tight">▂▄▆ 100%</span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

/** Khung trình duyệt cho demo website — thanh địa chỉ giả lập, cuộn bên trong */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-lg border-2 border-ink bg-paper shadow-brutal">
      <div className="flex items-center gap-3 border-b-2 border-ink bg-secondary px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full border border-ink bg-destructive/70" />
          <span className="size-2.5 rounded-full border border-ink bg-gold" />
          <span className="size-2.5 rounded-full border border-ink bg-brand/60" />
        </span>
        <span className="flex-1 truncate rounded-md border border-ink/30 bg-paper px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="h-[560px] overflow-y-auto bg-white md:h-[620px]">{children}</div>
    </div>
  )
}
