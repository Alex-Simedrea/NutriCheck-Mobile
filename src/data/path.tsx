import { create, StoreApi, UseBoundStore } from 'zustand';

export const usePath: UseBoundStore<
  StoreApi<{
    path: string;
    setPath: (path: string) => void;
  }>
> = create((set) => ({
  path: '',
  setPath: (path: string) => set({ path }),
}));
