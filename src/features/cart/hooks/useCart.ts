import { create } from 'zustand';

import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';

type CartStore = {
  items: ICartItem[];
  isOpen: boolean;
  setItems: (product: ICartItem[]) => void;
  addItem: (product: ICartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,

  setItems: (items) => set({ items }),

  addItem: (product) =>
    set(({ items }) => {
      const exists = items.some((item) => item.id === product.id);
      if (exists) {
        return {
          items: items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item,
          ),
        };
      }
      return { items: [...items, product] };
    }),

  removeItem: (id: string) =>
    set(({ items }) => ({
      items: items.filter((item) => item.id !== id),
    })),

  updateItemQuantity: (id, quantity) =>
    set(({ items }) => ({
      items: items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    })),

  openCart: () => set({ isOpen: true }),

  closeCart: () => set({ isOpen: false }),
}));
