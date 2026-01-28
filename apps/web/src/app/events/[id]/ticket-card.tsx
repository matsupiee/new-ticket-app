'use client';

import { useState } from 'react';
import { useCart } from '../../../libs/cart/cart-context';

type Ticket = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type Props = {
  ticket: Ticket;
  eventId: string;
  eventName: string;
};

export function TicketCard({ ticket, eventId, eventName }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { addItem } = useCart();

  const isOutOfStock = ticket.stock === 0;
  const maxQuantity = Math.min(ticket.stock, 10);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      ticketId: ticket.id,
      ticketName: ticket.name,
      eventId,
      eventName,
      price: ticket.price,
      quantity,
    });
    setShowMessage(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowMessage(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{ticket.name}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          ¥{ticket.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {isOutOfStock ? (
            <span className="text-gray-900 font-medium">売り切れ</span>
          ) : (
            `残り ${ticket.stock} 枚`
          )}
        </p>
      </div>

      {!isOutOfStock && (
        <div className="flex items-center gap-4">
          {showMessage && (
            <span className="text-sm text-gray-600">カートに追加しました</span>
          )}
          <div className="flex items-center gap-2">
            <label htmlFor={`quantity-${ticket.id}`} className="text-sm text-gray-600">
              枚数:
            </label>
            <select
              id={`quantity-${ticket.id}`}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isAdding ? '追加中...' : 'カートに追加'}
          </button>
        </div>
      )}
    </div>
  );
}
