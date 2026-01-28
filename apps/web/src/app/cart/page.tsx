'use client';

import Link from 'next/link';
import { useCart } from '../../libs/cart/cart-context';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">カート</h1>
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">カートは空です</p>
            <Link
              href="/events"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              イベント一覧へ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">カート</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-gray-900 underline transition-colors"
          >
            カートを空にする
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.ticketId}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{item.eventName}</p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.ticketName}
                  </h3>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    ¥{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">枚数:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.ticketId, Number(e.target.value))
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="text-lg font-semibold text-gray-900 min-w-[100px] text-right">
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </p>

                  <button
                    onClick={() => removeItem(item.ticketId)}
                    className="text-gray-400 hover:text-gray-900 transition-colors p-2"
                    aria-label="削除"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg text-gray-600">
              合計 ({totalItems}枚)
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ¥{totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/events"
              className="flex-1 text-center border border-gray-900 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              買い物を続ける
            </Link>
            <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
              購入手続きへ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
