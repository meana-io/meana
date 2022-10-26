import Ram from '@/types/ram';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type NodeId = string;

export enum RAM {
  GET_RAM = 'GET_RAM',
}

export const useGetNodeRam = (nodeId: NodeId, options?) => {
  return useQuery<Ram[]>(
    [RAM.GET_RAM, nodeId],
    () =>
      instance.get('/node-ram', {
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
