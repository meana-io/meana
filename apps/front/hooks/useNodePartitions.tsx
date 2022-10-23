import Partition from '@/types/partition';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type DiskId = string;

export const getPartitionByDiskId = async (
  diskId: DiskId
): Promise<Partition[]> => {
  const { data: nodePartitions } = await instance.get('/node-disk-partitions', {
    data: {
      where: {
        diskIdentifier: diskId,
      },
    },
  });
  return nodePartitions;
};

const useNodePartitions = (diskId: DiskId, options?) => {
  return useQuery<Partition[]>(
    ['partitions', diskId],
    () => getPartitionByDiskId(diskId),
    options
  );
};

export default useNodePartitions;
