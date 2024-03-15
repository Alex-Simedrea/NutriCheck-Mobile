import api from '@/api/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface Account {
  email: string;
  user: string;
  firstName: string;
  lastName: string;
}

export const fetchAccount = async () => {
  return api.get('/profile').then((res) => res.data as Account);
};

export const updateAccount = async (account: Account) => {
  return api.patch('/auth', account).then((res) => res.data as Account);
};

export const updatePassword = async (password: string) => {
  return api
    .patch('/auth/password', { password })
    .then((res) => res.data as Account);
};

export const deleteAccount = async () => {
  return api.delete('/auth').then((res) => res.data as Account);
};

export const useGetAccount = () => {
  return useQuery({ queryKey: ['account'], queryFn: fetchAccount });
};

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: (account: Account) => updateAccount(account),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: string) => updatePassword(password),
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
