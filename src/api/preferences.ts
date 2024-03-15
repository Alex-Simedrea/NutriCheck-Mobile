import api from '@/api/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface Nutriments {
  nutriscore: 'a' | 'b' | 'c' | 'd' | 'e';
  salt: boolean;
  sugars: boolean;
  fat: boolean;
  'saturated-fat': boolean;
}

export interface Allergens {
  'en:gluten': boolean;
  'en:milk': boolean;
  'en:eggs': boolean;
  'en:nuts': boolean;
  'en:peanuts': boolean;
  'en:sesame-seeds': boolean;
  'en:soybeans': boolean;
  'en:celery': boolean;
  'en:mustard': boolean;
  'en:lupin': boolean;
  'en:fish': boolean;
  'en:crustaceans': boolean;
  'en:molluscs': boolean;
  'en:sulphur-dioxide-and-sulphites': boolean;
}

export interface Ingredient {
  id: string;
  text: string;
}

export interface Preferences {
  nutriments: Nutriments;
  allergens: Allergens;
  ingredients: Ingredient[];
  vegetarian: boolean;
  vegan: boolean;
  pescatarian: boolean;
  palmoil: boolean;
  'calorie-goal': number;
}

export const fetchPreferences = async () => {
  const res = await api.get('/profile/preferences');
  return res.data;
};

export const updatePreferences = async (preferences: Preferences) => {
  const res = await api.patch('/profile', preferences);
  return res.data;
};

export const useGetPreferences = () => {
  return useQuery({ queryKey: ['preferences'], queryFn: fetchPreferences });
};

export const useUpdatePreferences = () => {
  return useMutation({
    mutationFn: (preferences: Preferences) => updatePreferences(preferences),
  });
};
