import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CtaLink } from '@/components/shared/CtaLink'
import { SITE } from '@/content/site'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const ERROR_TEXT = 'Gửi chưa được — bạn nhắn Zalo hoặc gọi trực tiếp giúp LDK nhé.'

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const successRef = useRef<HTMLParagraphElement>(null)
  const { contact } = SITE
  // Chưa cấu hình API nhận lead -> ẩn form, chỉ hiện kênh Zalo/gọi (không bao giờ dead-end)
  const formReady = SITE.leadApiUrl !== ''

  // Thành công thì form unmount -> phải chủ động chuyển focus sang thông báo
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const statusText =
    status === 'sending'
      ? 'Đang gửi…'
      : status === 'success'
        ? contact.success
        : status === 'error'
          ? ERROR_TEXT
          : ''

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot — bot tự điền thì bỏ qua
    setStatus('sending')
    try {
      // API tự host — xem README, mục "Kích hoạt form lead"
      const res = await fetch(SITE.leadApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'landing-ldktech',
          name: data.get('name'),
          phone: data.get('phone'),
          message: data.get('message'),
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
    <section id="lien-he" className="scroll-mt-20 border-t-2 border-ink bg-ink py-16 text-paper md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Cột trái: headline + kênh liên hệ trực tiếp */}
          <div className="lg:col-span-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gold">
              [07] — Liên hệ
            </p>
            <h2 className="mt-4 font-display text-3xl font-black uppercase leading-[1.15] tracking-tight font-expanded md:text-5xl">
              {contact.heading}
            </h2>
            <p className="mt-4 max-w-xl text-paper/75 md:text-lg">{contact.subheading}</p>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
              {contact.fallbackNote}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <CtaLink href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
              </CtaLink>
              <CtaLink variant="outline" href={SITE.phoneHref}>
                <Phone className="size-4" aria-hidden="true" /> {SITE.phone}
              </CtaLink>
            </div>

            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-paper/75 decoration-gold decoration-2 underline-offset-4 hover:underline"
            >
              <Mail className="size-4" aria-hidden="true" /> {SITE.email}
            </a>
          </div>

          {/* Cột phải: form lead (Web3Forms, không cần backend) */}
          <div className="lg:col-span-6">
            <div className="rounded-lg border-2 border-ink bg-paper p-6 text-ink shadow-brutal-brand md:p-8">
              <h3 className="font-display text-xl font-black uppercase tracking-tight font-expanded">
                {contact.formTitle}
              </h3>

              {/* Live region luôn mount để screen reader nghe được trạng thái gửi form (WCAG 4.1.3) */}
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
                    ✅ {contact.success}
                  </p>
                ) : (
                  <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
                    {/* honeypot chống spam — người thật không thấy */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="absolute -left-[9999px]"
                    />
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      {contact.fields.name}
                      <Input name="name" autoComplete="name" className="h-11 border-2 border-ink" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      {contact.fields.phone} <span className="sr-only">(bắt buộc)</span>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="h-11 border-2 border-ink"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      {contact.fields.message}
                      <Textarea name="message" rows={4} className="border-2 border-ink" />
                    </label>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-brand px-6 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brutal-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-brutal disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Đang gửi…' : contact.fields.submit}
                    </button>
                    {status === 'error' ? <p className="text-sm text-destructive">{ERROR_TEXT}</p> : null}
                  </form>
                )
              ) : (
                <div className="mt-5 flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Form đang được thiết lập. Trong lúc đó, kênh nhanh nhất để nhận tư vấn + báo
                    giá là Zalo hoặc gọi trực tiếp:
                  </p>
                  <CtaLink href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" /> Chat Zalo ngay
                  </CtaLink>
                  <CtaLink variant="outline" href={SITE.phoneHref}>
                    <Phone className="size-4" aria-hidden="true" /> Gọi {SITE.phone}
                  </CtaLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
