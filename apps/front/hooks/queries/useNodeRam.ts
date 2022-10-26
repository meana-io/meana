import Node from '@/types/node';
import Ram from '@/types/ram';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

export enum RAM {
  GET_RAM = 'GET_RAM',
}

export const useGetNodeRam = (nodeId: Pick<Node, 'uuid'>, options?) => {
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
