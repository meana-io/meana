import Ram from '@/types/ram';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type NodeId = string;

export const getRamByNodeId = async (nodeId: NodeId): Promise<Ram[]> => {
  const { data: nodeRam } = await instance.get('/node-ram', {
    data: {
      where: {
        nodeId,
      },
      limit: 50,
    },
  });
  return nodeRam;
};

const useNodeRam = (nodeId: NodeId, options?) => {
  return useQuery<Ram[]>(
    ['ram', nodeId],
    () => getRamByNodeId(nodeId),
    options
  );
};

export default useNodeRam;
