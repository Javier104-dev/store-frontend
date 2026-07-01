import { create } from 'zustand';

import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';

type CartStore = {
  items: ICartItem[];
  isOpen: boolean;
  addItem: (product: ICartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,

  addItem: (product) =>
    set(({ items }) => {
      const exists = items.find((item) => item.id === product.id);
      if (exists) {
        return {
          items: items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { items: [...items, { ...product, quantity: 1 }] };
    }),

  removeItem: (id: string) =>
    set(({ items }) => ({
      items: items.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id: string) =>
    set(({ items }) => ({
      items: items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),

  decreaseQuantity: (id: string) =>
    set(({ items }) => ({
      items: items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    })),

  openCart: () => set({ isOpen: true }),

  closeCart: () => set({ isOpen: false }),
}));
