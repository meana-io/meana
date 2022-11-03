import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Node from '@/types/node';
import { api } from '@/utility/api';
import { apiRoutes } from 'routes';

export enum NODE {
  GET_NODES = 'GET_NODES',
}

export const useGetNodesList = (options?) => {
  return useQuery(
    [NODE.GET_NODES],
    () => api.get<Node[]>(apiRoutes.nodes),
    options
  );
};

export interface CreateNodeFormData {
  name: string;
}

export const useCreateNode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateNodeFormData) => api.post<Node>(apiRoutes.nodes, data),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE.GET_NODES]);
      },
    }
  );
};

type NodeId = string;

export const useDeleteNode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (nodeId: NodeId) => api.delete<Node>(`${apiRoutes.nodes}/${nodeId}`),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE.GET_NODES]);
      },
    }
  );
};
