import Disk from '@/types/disk';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type NodeId = string;

export const getDisksByNodeId = async (nodeId: NodeId): Promise<Disk[]> => {
  const { data: nodeDisks } = await instance.get('/node-disks-a', {
    data: {
      where: {
        nodeId,
      },
    },
  });
  return nodeDisks;
};

const useNodeDisks = (nodeId: NodeId, options?) => {
  return useQuery<Disk[]>(
    ['disks', nodeId],
    () => getDisksByNodeId(nodeId),
    options
  );
};

export default useNodeDisks;
