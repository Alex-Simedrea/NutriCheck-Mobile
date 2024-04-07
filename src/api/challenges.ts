import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  organizer: string;
  startDate: string;
  endDate: string;
  goal: number;
  unit: string;
}

export const fetchChallenges = async () => {
  const res = await api.get('/challenge');
  return res.data;
};

export const fetchChallenge = async (id: string) => {
  const res = await api.get(`/challenge/${id}`);
  return res.data;
};

export const fetchTeamProgress = async (teamID: string) => {
  const res = await api.get(`/challenge/users/team/${teamID}`);
  return res.data;
};

export const fetchDailyIntake = async () => {
  const res = await api.get('/challenge/daily-intake');
  return res.data;
};

export const addDailyIntake = async (intake: {
  steps: number;
  energy: number;
  exercise: number;
}) => {
  const res = await api.post('/challenge/daily-intake', intake);
  return res.data;
};

export const useGetChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
  });
};

export const useGetChallenge = (id: string) => {
  return useQuery({
    queryKey: ['challenge', id],
    queryFn: () => fetchChallenge(id),
  });
};

export const useGetTeamProgress = (teamID: string) => {
  return useQuery({
    queryKey: ['team-progress', teamID],
    queryFn: () => fetchTeamProgress(teamID),
  });
};

export const useGetDailyIntake = () => {
  return useQuery({
    queryKey: ['daily-intake'],
    queryFn: fetchDailyIntake,
  });
};

export const useAddDailyIntake = (intake: {
  steps: number;
  energy: number;
  exercise: number;
}) => {
  return useQuery({
    queryKey: ['daily-intake'],
    queryFn: () => addDailyIntake(intake),
  });
};
