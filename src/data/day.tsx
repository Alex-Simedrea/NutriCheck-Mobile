import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Challenge {
  goal: number;
  unit: string;
}

export const useDay = create(
  persist<{
    day: string;
    challenge: Challenge;
    setDay: (day: string) => void;
    setChallenge: (challenge: Challenge) => void;
  }>(
    (set) => ({
      day: new Date(0).toISOString(),
      challenge: {
        goal: 0,
        unit: '',
      },
      setDay: (day: string) => set({ day }),
      setChallenge: (challenge: Challenge) => set({ challenge }),
    }),
    {
      name: 'daily-challenge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
