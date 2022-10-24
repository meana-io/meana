import Node from '@/types/node';
import instance from '@/utility/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export enum NODE {
  GET_NODES = 'GET_NODES',
}

export const useGetNodes = (options?) => {
  return useQuery<Node[]>(
    [NODE.GET_NODES],
    () => instance.get('/nodes'),
    options
  );
};

interface CreateNodeFormData {
  name: string;
}

export const useCreateNode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateNodeFormData) => instance.post('/nodes', data),
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
