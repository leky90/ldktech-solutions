import { useRef, useState, type FormEvent } from 'react'
import { Check, MapPin, Phone, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dữ liệu minh hoạ — thương hiệu hư cấu "Bếp Quê"
const MENU: Record<string, { name: string; desc: string; price: string }[]> = {
  'Món chính': [
    { name: 'Cá kho tộ', desc: 'Cá lóc kho tiêu trong nồi đất, đậm vị', price: '95.000đ' },
    { name: 'Canh chua cá lóc', desc: 'Chua thanh me, thơm ngò gai bạc hà', price: '85.000đ' },
    { name: 'Gà ta hấp lá chanh', desc: 'Gà thả vườn, chấm muối tiêu chanh', price: '165.000đ' },
    { name: 'Rau muống xào tỏi', desc: 'Giòn xanh, thơm lừng tỏi phi', price: '45.000đ' },
  ],
  'Khai vị': [
    { name: 'Gỏi ngó sen tôm thịt', desc: 'Chua ngọt, đậu phộng rang giòn', price: '75.000đ' },
    { name: 'Chả giò rế', desc: 'Cuốn rế giòn rụm, nhân thịt củ sắn', price: '65.000đ' },
    { name: 'Đậu hũ chiên sả', desc: 'Ngoài giòn trong mềm, chấm mắm gừng', price: '45.000đ' },
  ],
  'Đồ uống': [
    { name: 'Nước sấu đá', desc: 'Sấu ngâm nhà làm, mát lịm', price: '25.000đ' },
    { name: 'Trà tắc xí muội', desc: 'Chua ngọt hài hoà, giải ngấy', price: '20.000đ' },
    { name: 'Sâm bí đao', desc: 'Nấu lá dứa, thơm dịu', price: '22.000đ' },
  ],
}

export function RestaurantDemo() {
  const [category, setCategory] = useState<keyof typeof MENU>('Món chính')
  const [booked, setBooked] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)

  const onBook = (e: FormEvent) => {
    e.preventDefault()
    setBooked(true)
  }

  return (
    <div className="font-sans text-stone-800">
      {/* Header trong khung web */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-amber-200 bg-amber-50/95 px-5 py-3 backdrop-blur">
        <p className="flex items-center gap-2 font-display text-lg font-black text-amber-900">
          <UtensilsCrossed className="size-5" aria-hidden="true" /> Bếp Quê
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="rounded-full px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100"
          >
            Thực đơn
          </button>
          <button
            type="button"
            onClick={() => bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="rounded-full bg-amber-700 px-3 py-1.5 text-xs font-bold text-white"
          >
            Đặt bàn
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-800 to-orange-700 px-6 py-12 text-center text-amber-50">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Cơm nhà ba miền</p>
        <p className="mt-2 font-display text-3xl font-black">Nấu như mẹ nấu</p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-amber-100">
          Món quê chuẩn vị, nguyên liệu chợ sớm mỗi ngày. Đặt bàn trước để không phải chờ.
        </p>
        <button
          type="button"
          onClick={() => bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="mt-5 rounded-full bg-amber-50 px-6 py-2.5 text-sm font-bold text-amber-900 active:scale-95"
        >
          Đặt bàn ngay
        </button>
      </div>

      {/* Thực đơn */}
      <div ref={menuRef} className="scroll-mt-14 px-5 py-8">
        <p className="text-center font-display text-2xl font-black text-amber-900">Thực đơn</p>
        <div className="mt-4 flex justify-center gap-2">
          {(Object.keys(MENU) as (keyof typeof MENU)[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-bold',
                category === item ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-900',
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-5 flex max-w-md flex-col gap-3">
          {MENU[category].map((dish) => (
            <div key={dish.name} className="flex items-baseline justify-between gap-4 border-b border-dashed border-amber-200 pb-3">
              <div>
                <p className="text-sm font-bold">{dish.name}</p>
                <p className="mt-0.5 text-xs text-stone-500">{dish.desc}</p>
              </div>
              <p className="shrink-0 text-sm font-black text-amber-800">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Đặt bàn */}
      <div ref={bookRef} className="scroll-mt-14 bg-amber-50 px-5 py-8">
        <p className="text-center font-display text-2xl font-black text-amber-900">Đặt bàn</p>
        {booked ? (
          <div className="mx-auto mt-5 flex max-w-sm flex-col items-center gap-2 rounded-2xl bg-white p-6 text-center shadow-sm">
            <span className="grid size-12 place-items-center rounded-full bg-amber-700 text-white">
              <Check className="size-6" aria-hidden="true" />
            </span>
            <p className="font-bold">Đã nhận yêu cầu giữ bàn!</p>
            <p className="text-xs text-stone-500">
              Đây là bản minh hoạ — ở website thật, quán nhận thông báo ngay và gọi xác nhận trong ít phút.
            </p>
            <button type="button" onClick={() => setBooked(false)} className="mt-1 text-xs font-bold text-amber-800 underline">
              Đặt bàn khác
            </button>
          </div>
        ) : (
          <form onSubmit={onBook} className="mx-auto mt-5 flex max-w-sm flex-col gap-3">
            <input
              required
              placeholder="Tên của bạn"
              aria-label="Tên của bạn"
              autoComplete="off"
              className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-amber-500"
            />
            <input
              required
              type="tel"
              placeholder="Số điện thoại"
              aria-label="Số điện thoại"
              autoComplete="off"
              className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-amber-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <select className="rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" aria-label="Số khách">
                <option>2 khách</option>
                <option>4 khách</option>
                <option>6 khách</option>
                <option>Trên 8 khách</option>
              </select>
              <select className="rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none" aria-label="Khung giờ">
                <option>11:30 trưa</option>
                <option>12:30 trưa</option>
                <option>18:00 tối</option>
                <option>19:30 tối</option>
              </select>
            </div>
            <button type="submit" className="rounded-full bg-amber-700 py-3 text-sm font-bold text-white active:scale-95">
              Giữ bàn
            </button>
          </form>
        )}
      </div>

      {/* Thông tin */}
      <div className="px-5 py-8 text-sm">
        <div className="mx-auto flex max-w-md flex-col gap-2 text-stone-600">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 text-amber-700" aria-hidden="true" /> 12 Đường Hoa Sữa, Phường Demo (địa chỉ minh hoạ)
          </p>
          <p className="flex items-center gap-2">
            <Phone className="size-4 text-amber-700" aria-hidden="true" /> Mở cửa 10:00 – 21:30, cả tuần
          </p>
          <div className="mt-2 grid h-28 place-items-center rounded-xl bg-stone-100 text-xs text-stone-500">
            [ Bản đồ Google Maps hiển thị ở website thật ]
          </div>
        </div>
      </div>

      <p className="border-t border-amber-100 py-4 text-center text-[11px] text-stone-500">
        Bếp Quê — thương hiệu hư cấu, dữ liệu minh hoạ cho bản demo của LDK Tech
      </p>
    </div>
  )
}
