import { create, StoreApi, UseBoundStore } from 'zustand';

export const useNotification: UseBoundStore<
  StoreApi<{
    shown: boolean;
    setShown: (shown: boolean) => void;
  }>
> = create((set) => ({
  shown: true,
  setShown: (shown: boolean) => set({ shown }),
}));
