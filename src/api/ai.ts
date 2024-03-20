import api from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchResponse = async (prompt: string) => {
  const res = await api.post('/ai', { prompt });
  console.log('response', JSON.stringify(res));
  return res.data;
};

export const useGenerate = () => {
  return useMutation({
    mutationFn: (prompt: string) => fetchResponse(prompt),
  });
};
