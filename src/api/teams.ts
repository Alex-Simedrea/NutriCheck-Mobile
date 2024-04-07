import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export interface Team {
  title: string;
  challengeID: number;
}

export const createTeam = async (team: Team) => {
  const res = await api.post('/team', team);
  return res.data;
};

export const createInvite = async (userID: string, teamID: string) => {
  const res = await api.post(`/team-invite/`, { userID, teamID });
  return res.data;
};

export const fetchTeams = async () => {
  const res = await api.get('/team');
  return res.data;
}

export const useGetTeams = () => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
}

export const useCreateTeam = (team: Team) =>{
  return useQuery({
    queryKey: ['teams'],
    queryFn: () => createTeam(team),
  });
}

export const useCreateInvite = (userID: string, teamID: string) =>{
  return useQuery({
    queryKey: ['teams'],
    queryFn: () => createInvite(userID, teamID),
  });
}
