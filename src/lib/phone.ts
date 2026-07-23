import { useEffect, useState } from 'react'
import { SITE } from '@/content/site'

export interface PhoneInfo {
  display: string
  telHref: string
  zaloHref: string
}

/**
 * SĐT không nằm trong HTML prerender để tránh bot quét spam:
 * lưu dạng base64 đảo ngược trong site.ts, chỉ giải mã ở client.
 */
export function decodePhone(): PhoneInfo {
  const digits = atob(SITE.phoneB64).split('').reverse().join('')
  return {
    display: digits.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3'),
    telHref: `tel:+84${digits.slice(1)}`,
    zaloHref: `https://zalo.me/${digits}`,
  }
}

/** SSR + lượt render đầu: mặt nạ và link trỏ về #lien-he (fallback không JS); sau hydrate: số thật */
const MASKED: PhoneInfo = {
  display: SITE.phoneMask,
  telHref: '#lien-he',
  zaloHref: '#lien-he',
}

export function usePhone(): PhoneInfo {
  const [info, setInfo] = useState<PhoneInfo>(MASKED)
  useEffect(() => {
    setInfo(decodePhone())
  }, [])
  return info
}
