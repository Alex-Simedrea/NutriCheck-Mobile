import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  return res.data.data;
};

export const updatePreferences = async (preferences: Preferences) => {
  const res = await api.patch('/profile', { data: preferences });
  return res.data;
};

export const useGetPreferences = () => {
  return useQuery({
    queryKey: ['preferences'],
    queryFn: fetchPreferences,
    staleTime: 0,
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: Preferences) => updatePreferences(preferences),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
};
