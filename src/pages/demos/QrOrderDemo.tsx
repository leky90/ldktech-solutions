import { useState } from 'react'
import { Check, ChefHat, Coffee, Minus, Plus, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dữ liệu minh hoạ — thương hiệu hư cấu "Hạt & Lá". Giá lưu theo nghìn đồng.
const MENU: Record<string, { name: string; price: number }[]> = {
  'Cà phê': [
    { name: 'Cà phê sữa đá', price: 29 },
    { name: 'Cà phê đen đá', price: 25 },
    { name: 'Bạc xỉu nóng', price: 32 },
  ],
  'Trà & nước': [
    { name: 'Trà đào cam sả', price: 45 },
    { name: 'Trà ổi hồng', price: 42 },
    { name: 'Nước ép cam', price: 39 },
  ],
  Bánh: [
    { name: 'Bánh sừng bò bơ', price: 35 },
    { name: 'Tiramisu', price: 55 },
    { name: 'Bánh chuối nướng', price: 30 },
  ],
}
const ALL_ITEMS = Object.values(MENU).flat()

type Screen = 'menu' | 'cart' | 'status'

export function QrOrderDemo() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [category, setCategory] = useState<keyof typeof MENU>('Cà phê')
  const [cart, setCart] = useState<Record<string, number>>({})

  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const total = Object.entries(cart).reduce(
    (sum, [name, qty]) => sum + qty * (ALL_ITEMS.find((i) => i.name === name)?.price ?? 0),
    0,
  )

  const add = (name: string, delta: number) =>
    setCart((prev) => {
      const next = { ...prev, [name]: Math.max(0, (prev[name] ?? 0) + delta) }
      if (next[name] === 0) delete next[name]
      return next
    })

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-stone-100 text-stone-800">
      {/* Header quán */}
      <div className="flex items-center justify-between bg-stone-900 px-4 py-3 text-white">
        <p className="flex items-center gap-2 font-display text-base font-black">
          <Coffee className="size-4 text-amber-400" aria-hidden="true" /> Hạt & Lá
        </p>
        <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-stone-900">Bàn 05</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {screen === 'menu' ? (
          <div className="px-4 py-3">
            <div className="flex gap-2">
              {(Object.keys(MENU) as (keyof typeof MENU)[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-bold',
                    category === item ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 shadow-sm',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {MENU[category].map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3.5 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs font-bold text-amber-700">{item.price}.000đ</p>
                  </div>
                  {cart[item.name] ? (
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        aria-label={`Bớt ${item.name}`}
                        onClick={() => add(item.name, -1)}
                        className="grid size-7 place-items-center rounded-full bg-stone-200 active:scale-90"
                      >
                        <Minus className="size-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-4 text-center text-sm font-black">{cart[item.name]}</span>
                      <button
                        type="button"
                        aria-label={`Thêm ${item.name}`}
                        onClick={() => add(item.name, 1)}
                        className="grid size-7 place-items-center rounded-full bg-stone-900 text-white active:scale-90"
                      >
                        <Plus className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => add(item.name, 1)}
                      className="grid size-8 place-items-center rounded-full bg-stone-900 text-white active:scale-90"
                      aria-label={`Thêm ${item.name}`}
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {screen === 'cart' ? (
          <div className="px-4 py-4">
            <p className="font-display text-lg font-black">Giỏ của bàn 05</p>
            <div className="mt-3 flex flex-col gap-2.5">
              {Object.entries(cart).map(([name, qty]) => {
                const item = ALL_ITEMS.find((i) => i.name === name)!
                return (
                  <div key={name} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3.5 shadow-sm">
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="mt-0.5 text-xs text-stone-500">{item.price}.000đ × {qty}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        aria-label={`Bớt ${name}`}
                        onClick={() => add(name, -1)}
                        className="grid size-7 place-items-center rounded-full bg-stone-200 active:scale-90"
                      >
                        <Minus className="size-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-4 text-center text-sm font-black">{qty}</span>
                      <button
                        type="button"
                        aria-label={`Thêm ${name}`}
                        onClick={() => add(name, 1)}
                        className="grid size-7 place-items-center rounded-full bg-stone-900 text-white active:scale-90"
                      >
                        <Plus className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <input
              placeholder="Ghi chú cho quầy (ít đá, ít ngọt…)"
              autoComplete="off"
              className="mt-3 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-stone-400"
            />
            <button
              type="button"
              disabled={count === 0}
              onClick={() => setScreen('status')}
              className="mt-4 w-full rounded-full bg-stone-900 py-3 text-sm font-bold text-white disabled:opacity-40"
            >
              Gửi order xuống quầy · {total}.000đ
            </button>
            <button type="button" onClick={() => setScreen('menu')} className="mt-2 w-full py-2 text-xs font-bold text-stone-500">
              ← Gọi thêm món
            </button>
          </div>
        ) : null}

        {screen === 'status' ? (
          <div className="px-4 py-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-emerald-600 text-white">
                <Check className="size-7" aria-hidden="true" />
              </span>
              <p className="font-display text-lg font-black">Quầy đã nhận order!</p>
              <p className="text-xs text-stone-500">Bàn 05 · {count} món · {total}.000đ</p>
            </div>
            <div className="mx-auto mt-6 flex max-w-[240px] flex-col gap-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="font-semibold">Đã nhận order</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="grid size-8 shrink-0 animate-pulse place-items-center rounded-full bg-amber-400 text-stone-900">
                  <ChefHat className="size-4" aria-hidden="true" />
                </span>
                <span className="font-semibold">Đang chuẩn bị…</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-400">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-stone-200">
                  <ShoppingBag className="size-4" aria-hidden="true" />
                </span>
                <span>Mang ra bàn</span>
              </div>
            </div>
            <p className="mt-6 text-center text-[11px] text-stone-400">
              Trạng thái mô phỏng cho bản demo — ở bản thật, quầy bar và bếp thấy order ngay lập tức.
            </p>
            <button
              type="button"
              onClick={() => {
                setCart({})
                setScreen('menu')
              }}
              className="mx-auto mt-4 block rounded-full bg-stone-900 px-5 py-2.5 text-xs font-bold text-white active:scale-95"
            >
              Gọi lượt mới
            </button>
          </div>
        ) : null}
      </div>

      {/* Thanh giỏ hàng */}
      {screen === 'menu' ? (
        <div className="border-t border-stone-200 bg-white p-3">
          <button
            type="button"
            disabled={count === 0}
            onClick={() => setScreen('cart')}
            className="flex w-full items-center justify-between rounded-full bg-stone-900 px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-4" aria-hidden="true" /> Xem giỏ ({count} món)
            </span>
            <span>{total}.000đ</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
