import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const fetchSubmission = async (id: string) => {
  return api.get(`/submission/${id}`).then((res) => res.data);
};

export const fetchOwnSubmissions = async () => {
  return api.get('/submission').then((res) => res.data);
};

export const createSubmission = async (data: any) => {
  return api.post('/submission', data).then((res) => res.data);
};

export const updateSubmission = async (id: string, data: any) => {
  return api.patch(`/submission/${id}`, data).then((res) => res.data);
};

export const deleteSubmission = async (id: string) => {
  return api.delete(`/submission/${id}`).then((res) => res.data);
};

export const useGetSubmission = (id: string) => {
  return useQuery({
    queryKey: ['submission', id],
    queryFn: () => fetchSubmission(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetOwnSubmissions = () => {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: fetchOwnSubmissions,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createSubmission(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'customToast',
        text1: 'Error creating submission',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    },
  });
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateSubmission(data.id, data),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['submissions'] }),
        queryClient.invalidateQueries({ queryKey: ['submission', data.id] }),
      ]);
    },
    onError: (error) => {
      Toast.show({
        type: 'customToast',
        text1: 'Error updating submission',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    },
  });
};

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubmission(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'customToast',
        text1: 'Error deleting submission',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    },
  });
};
