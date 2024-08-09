import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useWater = create(
  persist<{
    day: string;
    water: number;
    setDay: (day: string) => void;
    setWater: (water: number) => void;
  }>(
    (set) => ({
      day: new Date(0).toISOString(),
      water: 0,
      setDay: (day: string) => set({ day }),
      setWater: (water: number) => set({ water }),
    }),
    {
      name: 'water',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
