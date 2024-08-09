import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFood = create(
  persist<{
    day: string;
    food: number;
    setDay: (day: string) => void;
    setFood: (food: number) => void;
  }>(
    (set) => ({
      day: new Date(0).toISOString(),
      food: 0,
      setDay: (day: string) => set({ day }),
      setFood: (food: number) => set({ food }),
    }),
    {
      name: 'food',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
