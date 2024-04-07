import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export interface Goals {
  energy: number;
  steps: number;
  exercise: number;
  water: number;
  food: number;
}

export const fetchGoals = async () => {
  const res = await api.get('/profile/preferences');
  return res.data.goals as Goals;
};

export const updateGoals = async (goals: Goals) => {
  const res = await api.patch('/profile/goals', { data: goals });
  return res.data;
};

export const useGetGoals = () => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  });
};

export const useUpdateGoals = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goals: Goals) => updateGoals(goals),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    }
  });
};
