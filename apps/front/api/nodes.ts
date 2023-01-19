import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Node from '@/types/node';
import { api } from '@/utility/api';
import { apiRoutes } from 'routes';
import { toast } from 'react-toastify';

export enum NODE {
  GET_NODES = 'GET_NODES',
  GET_NODE = 'GET_NODE',
}

type NodeId = string;

export const useGetNodesList = (options?) => {
  return useQuery(
    [NODE.GET_NODES],
    () => api.get<Node[]>(apiRoutes.nodes),
    options
  );
};

export const useGetNode = (nodeId: NodeId, options?) => {
  return useQuery(
    [NODE.GET_NODE, nodeId],
    () => api.get<Node>(`${apiRoutes.nodes}/${nodeId}`),
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
      onSuccess: () => {
        toast.success('The node has been successfully created.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE.GET_NODES]);
      },
    }
  );
};


interface UpdateNodeFormData {
  name: string;
  nodeId: string;
}

export const useUpdateNode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ name, nodeId }: UpdateNodeFormData) =>
      api.patch<Node>(`${apiRoutes.nodes}/${nodeId}`, { name }),
    {
      onSuccess: () => {
        toast.success('The node has been successfully updated.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE.GET_NODES]);
      },
    }
  );
};
export const useDeleteNode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (nodeId: NodeId) => api.delete<Node>(`${apiRoutes.nodes}/${nodeId}`),
    {
      onSuccess: () => {
        toast.success('The node has been successfully deleted.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE.GET_NODES]);
      },
    }
  );
};
