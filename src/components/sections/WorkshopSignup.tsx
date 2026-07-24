import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'
import { usePhone } from '@/lib/phone'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const ERROR_TEXT = 'Gửi chưa được — bạn nhắn Zalo giúp LDK để giữ chỗ nhé.'
const SUCCESS_TEXT =
  'Đã nhận đăng ký! LDK sẽ nhắn Zalo báo lịch đợt gần nhất và giữ chỗ cho bạn. Cần gấp thì chat Zalo ngay bên cạnh.'

const INDUSTRIES = ['Quán ăn / Cà phê', 'Spa / Làm đẹp', 'Cửa hàng bán lẻ', 'Dịch vụ khác']
const MODES = ['Trực tiếp tại LDK', 'Online qua Zoom']

/** Form giữ chỗ workshop — đổ lead về Cloudflare Worker với source riêng để tách phễu Academy */
export function WorkshopSignup() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const successRef = useRef<HTMLParagraphElement>(null)
  const phone = usePhone()
  const formReady = (SITE.leadApiUrl as string) !== ''

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const statusText =
    status === 'sending'
      ? 'Đang gửi…'
      : status === 'success'
        ? SUCCESS_TEXT
        : status === 'error'
          ? ERROR_TEXT
          : ''

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot
    setStatus('sending')
    try {
      const res = await fetch(SITE.leadApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'workshop-ai',
          name: data.get('name'),
          phone: data.get('phone'),
          message: `Ngành: ${data.get('industry') || '—'} | Hình thức: ${data.get('mode') || '—'}`,
        }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-lg border-2 border-ink bg-paper p-6 text-ink shadow-brutal-brand md:p-8">
      <h2 className="font-display text-xl font-black uppercase tracking-tight font-expanded">
        Giữ chỗ đợt gần nhất
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Nhóm nhỏ, mở theo đợt. Để lại số Zalo — LDK báo lịch và giữ chỗ cho bạn.
      </p>

      {/* Live region cho screen reader (WCAG 4.1.3) */}
      <p role="status" aria-live="polite" className="sr-only">
        {statusText}
      </p>

      {formReady ? (
        status === 'success' ? (
          <p
            ref={successRef}
            tabIndex={-1}
            className="mt-5 rounded-md border-2 border-ink bg-gold-soft/60 p-4 text-sm leading-relaxed"
          >
            ✅ {SUCCESS_TEXT}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute -left-[9999px]"
            />
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Tên của bạn
              <Input name="name" autoComplete="name" className="h-11 border-2 border-ink" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Số điện thoại / Zalo <span className="sr-only">(bắt buộc)</span>
              <Input name="phone" type="tel" required autoComplete="tel" className="h-11 border-2 border-ink" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Bạn đang kinh doanh gì?
              <select
                name="industry"
                className="h-11 rounded-md border-2 border-ink bg-paper px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {INDUSTRIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Muốn học hình thức nào?
              <select
                name="mode"
                className="h-11 rounded-md border-2 border-ink bg-paper px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {MODES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-brand px-6 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-brutal disabled:opacity-60"
            >
              {status === 'sending' ? 'Đang gửi…' : 'Giữ chỗ cho tôi'}
            </button>
            {status === 'error' ? <p className="text-sm text-destructive">{ERROR_TEXT}</p> : null}
          </form>
        )
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Đăng ký giữ chỗ đang được thiết lập. Trong lúc đó, nhắn Zalo để LDK báo lịch đợt gần nhất:
          </p>
          <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo giữ chỗ
          </CtaLink>
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Hoặc liên hệ nhanh
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <CtaLink href={phone.zaloHref} target="_blank" rel="noopener noreferrer" className="h-11 text-xs">
            <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo
          </CtaLink>
          <CtaLink variant="outline" href={phone.telHref} className="h-11 text-xs">
            <Phone className="size-4" aria-hidden="true" /> {phone.display}
          </CtaLink>
        </div>
      </div>
    </div>
  )
}
