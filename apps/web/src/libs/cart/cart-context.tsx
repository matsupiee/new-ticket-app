'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';

export type CartItem = {
  ticketId: string;
  ticketName: string;
  eventId: string;
  eventName: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { ticketId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { ticketId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (ticketId: string) => void;
  updateQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ticket-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.ticketId === action.payload.ticketId
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.ticketId === action.payload.ticketId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (item) => item.ticketId !== action.payload.ticketId
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => item.ticketId !== action.payload.ticketId
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.ticketId === action.payload.ticketId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const items = JSON.parse(stored) as CartItem[];
        dispatch({ type: 'LOAD_CART', payload: items });
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (ticketId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ticketId } });
  };

  const updateQuantity = (ticketId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { ticketId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
