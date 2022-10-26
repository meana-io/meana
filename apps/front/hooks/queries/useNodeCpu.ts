import Cpu from '@/types/cpu';
import Node from '@/types/node';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

export enum CPU {
  GET_CPU = 'GET_CPU',
}

export const useGetNodeCpu = (nodeId: Pick<Node, 'uuid'>, options?) => {
  return useQuery<Cpu[]>(
    [CPU.GET_CPU, nodeId],
    () =>
      instance.get('/node-cpu', {
        data: {
          where: {
            nodeId,
          },
          limit: 50,
        },
      }),
    options
  );
};
