import { Phone } from 'lucide-react'
import { CtaLink } from '@/components/shared/CtaLink'
import { usePhone } from '@/lib/phone'
import { cn } from '@/lib/utils'

interface CallCtaProps {
  variant?: 'gold' | 'brand' | 'outline'
  className?: string
}

/** Nút gọi chuẩn của site: hiện SỐ ĐIỆN THOẠI kèm mã quốc gia, đồng nhất mọi nơi.
 *
 *  SĐT chỉ giải mã sau hydrate (chống bot quét), nên số hiển thị dùng font mono và
 *  mặt nạ được đặt ĐÚNG 18 ký tự như số thật — chuỗi đổi sau hydrate mà bề ngang
 *  nút không nhảy một pixel nào. */
export function CallCta({ variant = 'outline', className }: CallCtaProps) {
  const phone = usePhone()

  return (
    <CtaLink variant={variant} href={phone.telHref} className={cn('font-mono', className)}>
      <Phone className="size-4 shrink-0" aria-hidden="true" />
      <span className="tracking-tight">{phone.display}</span>
    </CtaLink>
  )
}
