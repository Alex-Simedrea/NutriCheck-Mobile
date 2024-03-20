import api from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchResponse = async (prompt: string) => {
  const res = await api.post('/ai', { prompt });
  return res.data;
};

export const useGenerate = () => {
  return useMutation({
    mutationFn: (prompt: string) => fetchResponse(prompt),
  });
};
