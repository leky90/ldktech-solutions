import { useState } from 'react'
import { Calendar, Check, Home, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dữ liệu minh hoạ — thương hiệu hư cấu "An Nhiên"
const SERVICES = [
  { name: 'Chăm sóc da cơ bản', time: '60 phút', price: '350.000đ' },
  { name: 'Gội đầu dưỡng sinh', time: '45 phút', price: '180.000đ' },
  { name: 'Massage thư giãn', time: '90 phút', price: '450.000đ' },
  { name: 'Chăm sóc móng', time: '60 phút', price: '250.000đ' },
]
const DAYS = ['Hôm nay', 'Ngày mai', 'Thứ 7', 'Chủ nhật']
const SLOTS = ['9:00', '10:30', '14:00', '15:30', '17:00', '19:00']

type Tab = 'home' | 'book' | 'member'

export function SpaBookingDemo() {
  const [tab, setTab] = useState<Tab>('home')
  const [service, setService] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const startBooking = (name: string | null) => {
    setService(name)
    setDay(null)
    setSlot(null)
    setDone(false)
    setTab('book')
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-emerald-50/60 text-stone-800">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === 'home' ? (
          <div>
            <div className="bg-gradient-to-br from-emerald-700 to-teal-600 px-5 pb-6 pt-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Spa & chăm sóc sắc đẹp</p>
              <p className="mt-1 font-display text-2xl font-black">An Nhiên</p>
              <div className="mt-4 rounded-2xl bg-white/15 p-3 text-sm backdrop-blur">
                🌿 Ưu đãi tháng này: giảm 20% liệu trình chăm sóc da cho khách đặt lịch qua app
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm font-bold">Dịch vụ nổi bật</p>
              <div className="mt-3 flex flex-col gap-3">
                {SERVICES.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="mt-0.5 text-xs text-stone-500">{item.time} · {item.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startBooking(item.name)}
                      className="shrink-0 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white active:scale-95"
                    >
                      Đặt lịch
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'book' ? (
          <div className="px-5 py-4">
            {done ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-emerald-600 text-white">
                  <Check className="size-8" aria-hidden="true" />
                </span>
                <p className="font-display text-xl font-black">Đã đặt lịch!</p>
                <p className="text-sm text-stone-600">
                  {service} · {day} · {slot}
                </p>
                <p className="max-w-[240px] text-xs text-stone-500">
                  Ở bản thật, tin xác nhận và nhắc hẹn sẽ tự gửi qua Zalo (ZNS).
                </p>
                <button
                  type="button"
                  onClick={() => startBooking(null)}
                  className="mt-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white active:scale-95"
                >
                  Đặt lịch khác
                </button>
              </div>
            ) : (
              <>
                <p className="font-display text-lg font-black">Đặt lịch hẹn</p>

                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-stone-500">1 · Chọn dịch vụ</p>
                <div className="mt-2 flex flex-col gap-2">
                  {SERVICES.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={service === item.name}
                      onClick={() => setService(item.name)}
                      className={cn(
                        'flex items-center justify-between rounded-xl border-2 bg-white p-3 text-left text-sm',
                        service === item.name ? 'border-emerald-600' : 'border-transparent shadow-sm',
                      )}
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-xs text-stone-500">{item.price}</span>
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-stone-500">2 · Chọn ngày</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DAYS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={day === item}
                      onClick={() => setDay(item)}
                      className={cn(
                        'rounded-full px-4 py-2 text-xs font-semibold',
                        day === item ? 'bg-emerald-600 text-white' : 'bg-white text-stone-700 shadow-sm',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-stone-500">3 · Chọn giờ</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {SLOTS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={slot === item}
                      onClick={() => setSlot(item)}
                      className={cn(
                        'rounded-xl py-2.5 text-sm font-semibold',
                        slot === item ? 'bg-emerald-600 text-white' : 'bg-white text-stone-700 shadow-sm',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!service || !day || !slot}
                  onClick={() => setDone(true)}
                  className="mt-6 w-full rounded-full bg-emerald-600 py-3 text-sm font-bold text-white disabled:opacity-40"
                >
                  Xác nhận lịch hẹn
                </button>
              </>
            )}
          </div>
        ) : null}

        {tab === 'member' ? (
          <div className="px-5 py-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-600 p-5 text-white shadow">
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-100">Thẻ thành viên</p>
              <p className="mt-1 font-display text-xl font-black">An Nhiên · Hạng Bạc</p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-100">Điểm tích luỹ</p>
                  <p className="text-2xl font-black">120</p>
                </div>
                <Sparkles className="size-7 text-emerald-200" aria-hidden="true" />
              </div>
            </div>
            <p className="mt-5 text-sm font-bold">Ưu đãi của bạn</p>
            <div className="mt-2 flex flex-col gap-2 text-sm">
              <div className="rounded-xl bg-white p-3 shadow-sm">🎁 100 điểm = giảm 50.000đ cho lần hẹn tới</div>
              <div className="rounded-xl bg-white p-3 shadow-sm">🎂 Tặng gói gội dưỡng sinh trong tháng sinh nhật</div>
              <div className="rounded-xl bg-white p-3 shadow-sm">👯 Giới thiệu bạn mới: cả hai cùng nhận 30 điểm</div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Thanh điều hướng dưới */}
      <div className="grid grid-cols-3 border-t border-stone-200 bg-white text-[11px] font-semibold text-stone-400">
        {(
          [
            { key: 'home', label: 'Trang chủ', icon: Home },
            { key: 'book', label: 'Đặt lịch', icon: Calendar },
            { key: 'member', label: 'Thành viên', icon: User },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            type="button"
            aria-current={tab === item.key ? 'true' : undefined}
            onClick={() => setTab(item.key)}
            className={cn('flex flex-col items-center gap-1 py-2.5', tab === item.key && 'text-emerald-700')}
          >
            <item.icon className="size-5" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
