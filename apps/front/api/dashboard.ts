import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Node from '@/types/node';
import { api } from '@/utility/api';
import { apiRoutes } from 'routes';

export enum DASHBOARD {
  GET_DASHBOARD = 'GET_DASHBOARD',
}

export interface DashboardCard {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  key: string;
  query: string;
}

export interface DashboardCards {
  [key: string]: DashboardCard;
}

export const useGetDashboard = (options?) => {
  return useQuery(
    [DASHBOARD.GET_DASHBOARD],
    () => api.get<DashboardCards>(apiRoutes.dashboard),
    options
  );
};

export const useUpdateDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: DashboardCards) =>
      api.post<DashboardCards>(apiRoutes.dashboard, data),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([DASHBOARD.GET_DASHBOARD]);
      },
    }
  );
};
