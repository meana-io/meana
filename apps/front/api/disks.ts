import { DiskPartitions } from '@/components/Disks/Header';
import Disk from '@/types/disk';
import { api } from '@/utility/api';
import { Params, pathToUrl } from '@/utility/router';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum DISK {
  GET_DISKS = 'GET_DISKS',
  GET_DISKS_AND_PARTITIONS = 'GET_DISKS_AND_PARTITIONS',
}

export const useGetNodeDisksAndPartitions = (nodeId: NodeId, options?) => {
  return useQuery(
    [DISK.GET_DISKS_AND_PARTITIONS, nodeId],
    () =>
      api.get<DiskPartitions>(`${apiRoutes.getLatestDisks}?nodeUuid=${nodeId}`),
    options
  );
};

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
