import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface BodyProfile {
  weight: number;
  height: number;
  age: number;
  sex: 'male' | 'female';
  activityLevel: number;
  special: {
    pregnant: boolean;
    trimester: number;
    breastfeeding: boolean;
  };
}

export const fetchBodyProfile = async () => {
  const res = await api.get('/profile/preferences');
  return res.data.personal;
};


export const updateBodyProfile = async (bodyProfile: BodyProfile) => {
  const res = await api.patch('/profile/personal', {data: bodyProfile});
  return res.data;
};

export const useGetBodyProfile = () => {
  return useQuery({
    queryKey: ['bodyProfile'],
    queryFn: fetchBodyProfile,
  });
};

export const useUpdateBodyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bodyProfile: BodyProfile) => updateBodyProfile(bodyProfile),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
};
