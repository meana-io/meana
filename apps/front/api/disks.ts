import Disk from '@/types/disk';
import { api } from '@/utility/api';
import { Params, pathToUrl } from '@/utility/router';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum DISK {
  GET_DISKS = 'GET_DISKS',
}

export const useGetNodeDisksList = (
  nodeId: NodeId,
  query?: Params,
  options?
) => {
  return useQuery(
    [DISK.GET_DISKS, nodeId],
    () =>
      api.get<Disk[]>(
        pathToUrl(apiRoutes.nodeDisks, {
          search: {
            nodeId,
          },
          limit: 50,
          ...query,
        })
      ),
    options
  );
};
