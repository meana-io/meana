import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utility/api';
import { apiRoutes } from 'routes';
import { toast } from 'react-toastify';

export enum DASHBOARD {
  GET_DASHBOARD = 'GET_DASHBOARD',
}

type UserId = string;
export interface DashboardSettings {
  uuid: string;
  key: string;
  value: string;
}

export const useGetDashboard = (userId: UserId, options?) => {
  return useQuery(
    [DASHBOARD.GET_DASHBOARD, userId],
    () =>
      api
        .get<DashboardSettings>(`${apiRoutes.dashboard}/${userId}`)
        .then((response) => ({
          ...response,
          value: JSON.parse(
            response.value ?? '{"components": [], "layouts": {}}'
          ),
        })),
    options
  );
};

export const useUpdateDashboard = (userId: UserId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: DashboardSettings) =>
      api.post<DashboardSettings>(`${apiRoutes.dashboard}/${userId}`, data),
    {
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([DASHBOARD.GET_DASHBOARD, userId]);
      },
    }
  );
};

