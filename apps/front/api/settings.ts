import NodeSettings from '@/types/dashboardSettings copy';
import { api } from '@/utility/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiRoutes } from 'routes';

type NodeId = string;

export interface NODE_SETTINGS_DATA {
  ramMin: number;
  ramMax: number;
  cpuMin: number;
  cpuMax: number;
}

export enum NODE_SETTINGS {
  GET_NODE_SETTINGS = 'GET_NODE_SETTINGS',
  UPDATE_NODE_SETTINGS = 'UPDATE_NODE_SETTINGS',
}

export const useGetNodeSettings = (nodeId: NodeId, options?) => {
  return useQuery(
    [NODE_SETTINGS.GET_NODE_SETTINGS, nodeId],
    () => api.get<NodeSettings>(`${apiRoutes.nodeThresholds}/${nodeId}`),
    options
  );
};

export const useUpdateNodeSettings = (nodeId: NodeId, options?) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: NODE_SETTINGS_DATA) =>
      api.patch<NodeSettings>(`${apiRoutes.nodeThresholds}/${nodeId}`, data),
    {
      onSuccess: () => {
        toast.success('The node settings has been successfully updated.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE_SETTINGS.GET_NODE_SETTINGS]);
      },
    }
  );
};
