import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EditorialSectionProps {
  /** Nhãn mono ở đầu cột trái. Số ('01') khi mục là một phần của danh sách có thật;
   *  chữ ('Vấn đề') khi không — đánh số những thứ không có thứ tự chỉ là trang trí. */
  label: string
  title: string
  /** Câu dẫn cho cột nhãn (rộng ~250px từ lg, full-width bên dưới). Giữ dưới ~250 ký tự;
   *  đoạn giải thích dài hơn đặt trong children để không thành khối chữ xám hẹp. */
  intro?: string
  /** Link/ghi chú thêm dưới intro, vẫn nằm trong cột nhãn */
  aside?: ReactNode
  children: ReactNode
  id?: string
  className?: string
}

/** Mục nội dung kiểu tạp chí: cột nhãn 3 + cột nội dung 9, ngăn nhau bằng kẻ mảnh.
 *  Dùng chung cho /bang-gia/ và 7 trang /dich-vu/<slug>/ — để một chỗ nên hai trang
 *  không trôi khỏi nhau. Tỷ lệ 3/9 là tỷ lệ đã chạy thật: cột nội dung ~824px vừa đủ
 *  cho 3 TierCard mà chữ giá không bị cắt. */
export function EditorialSection({
  label,
  title,
  intro,
  aside,
  children,
  id,
  className,
}: EditorialSectionProps) {
  return (
    <section
      id={id}
      className={cn('border-t border-ink/20 py-16 md:py-24', id && 'scroll-mt-20', className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-brand">
              {label}
            </p>
            <h2 className="mt-3 font-display text-2xl font-black uppercase leading-[1.12] tracking-tight font-expanded md:text-3xl">
              {title}
            </h2>
            {/* max-w-sm chỉ có tác dụng dưới lg, lúc cột nhãn chiếm trọn bề ngang:
                không có nó thì ở khổ tablet dòng intro kéo dài ~100 ký tự, quá dài để đọc */}
            {intro ? (
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{intro}</p>
            ) : null}
            {aside}
          </div>

          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  )
}
