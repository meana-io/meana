import Disk from '@/types/disk';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type NodeId = string;

export enum DISK {
  GET_DISKS = 'GET_DISKS',
}

export const useGetNodeDisks = (nodeId: NodeId, options?) => {
  return useQuery<Disk[]>(
    [DISK.GET_DISKS, nodeId],
    () =>
      instance.get('/node-disks', {
        data: {
          where: {
            nodeId: 'd6b12c6f-2a1b-4132-ba0a-aa55d14f7ea2',
          },
        },
      }),
    options
  );
};
