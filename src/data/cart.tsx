import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  ean: string;
  count: number;
}

export interface CartContext {
  products: Product[];
}

export const useCart = create(
  persist<{
    cart: CartContext;
    reset: () => void;
    addProduct: (ean: string, count: number) => void;
    removeProduct: (ean: string) => void;
    incrementProduct: (ean: string) => void;
    decrementProduct: (ean: string) => void;
  }>(
    (set) => ({
      cart: {
        products: [],
      },
      reset: () =>
        set(() => ({
          cart: {
            products: [],
          },
        })),
      addProduct: (ean: string, count: number) =>
        set((state) => ({
          cart: {
            products: state.cart.products.find((item) => item.ean === ean)
              ? state.cart.products.map((item) =>
                  item.ean === ean ? { ...item, count: item.count + 1 } : item,
                )
              : [...state.cart.products, { ean, count }],
          },
        })),
      removeProduct: (ean: string) =>
        set((state) => ({
          cart: {
            products: state.cart.products.filter((item) => item.ean !== ean),
          },
        })),
      incrementProduct: (ean: string) =>
        set((state) => ({
          cart: {
            products: state.cart.products.map((item) =>
              item.ean === ean ? { ...item, count: item.count + 1 } : item,
            ),
          },
        })),
      decrementProduct: (ean: string) =>
        set((state) => ({
          cart: {
            products: state.cart.products.reduce((acc, item) => {
              if (item.ean === ean) {
                if (item.count > 1) {
                  acc.push({ ...item, count: item.count - 1 });
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, []),
          },
        })),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
