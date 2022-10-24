import Partition from '@/types/partition';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type DiskId = string;

export enum PARTITION {
  GET_PARTITIONS = 'GET_PARTITIONS',
}

export const useGetNodePartitions = (diskId: DiskId, options?) => {
  return useQuery<Partition[]>(
    [PARTITION.GET_PARTITIONS, diskId],
    () =>
      instance.get('/node-disk-partitions', {
        data: {
          where: {
            diskIdentifier: diskId,
          },
        },
      }),
    options
  );
};
