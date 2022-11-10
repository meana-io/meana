import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utility/api';
import { apiRoutes } from 'routes';

export enum DASHBOARD {
  GET_DASHBOARD = 'GET_DASHBOARD',
}

export interface DashboardSettings {
  uuid: string;
  key: string;
  value: string;
}

export const useGetDashboard = (options?) => {
  return useQuery(
    [DASHBOARD.GET_DASHBOARD],
    () =>
      api.get<DashboardSettings>(apiRoutes.dashboard).then((response) => ({
        ...response,
        value: JSON.parse(response.value),
      })),
    options
  );
};

export const useUpdateDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: DashboardSettings) =>
      api.post<DashboardSettings>(apiRoutes.dashboard, data),
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
