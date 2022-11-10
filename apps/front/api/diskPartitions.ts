import Partition from '@/types/partition';
import { api } from '@/utility/api';
import { Params, pathToUrl } from '@/utility/router';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type DiskId = string;

export enum PARTITION {
  GET_PARTITIONS = 'GET_PARTITIONS',
}

export const useGetNodeDiskPartitionsList = (
  diskId: DiskId,
  query?: Params,
  options?
) => {
  return useQuery(
    [PARTITION.GET_PARTITIONS, diskId],
    () =>
      api.get<Partition[]>(
        pathToUrl(apiRoutes.nodeDiskPartitions, {
          search: {
            usedSpace: diskId,
          },
          limit: 50,
          ...query,
        })
      ),
    options
  );
};
