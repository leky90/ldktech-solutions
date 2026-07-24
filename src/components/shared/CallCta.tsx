import { Phone } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { usePhone } from '@/lib/phone'
import { cn } from '@/lib/utils'

interface CallCtaProps {
  variant?: 'gold' | 'brand' | 'outline'
  className?: string
}

/** Nút gọi chuẩn của site: nhãn HÀNH ĐỘNG "Gọi ngay" + số thật cỡ nhỏ bên dưới.
 *
 *  Vì SĐT chỉ giải mã sau hydrate (chống bot quét), dòng số dùng font mono và
 *  render sẵn mặt nạ ở trạng thái trong suốt để GIỮ CHỖ — mặt nạ và số thật đều
 *  12 ký tự nên khi đổi sang số thật không hề xê dịch layout, cũng không ai kịp
 *  thấy "09•• ••• •••" nhấp nháy. */
export function CallCta({ variant = 'outline', className }: CallCtaProps) {
  const phone = usePhone()

  return (
    <span className={cn('inline-flex flex-col items-center gap-1.5', className)}>
      <CtaLink variant={variant} href={phone.telHref}>
        <Phone className="size-4" aria-hidden="true" /> Gọi ngay
      </CtaLink>
      <span
        aria-hidden={!phone.ready}
        className={cn(
          'font-mono text-[11px] tracking-[0.08em] opacity-60 transition-opacity duration-200',
          !phone.ready && 'opacity-0',
        )}
      >
        {phone.display}
      </span>
    </span>
  )
}
