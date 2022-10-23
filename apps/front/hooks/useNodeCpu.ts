import Cpu from '@/types/cpu';
import instance from '@/utility/axios';
import { useQuery } from '@tanstack/react-query';

type NodeId = string;

export const getCpuByNodeId = async (nodeId: NodeId): Promise<Cpu[]> => {
  const { data: nodeCpu } = await instance.get('/node-cpu', {
    data: {
      where: {
        nodeId,
      },
      limit: 50,
    },
  });
  return nodeCpu;
};

const useNodeCpu = (nodeId: NodeId, options?) => {
  return useQuery<Cpu[]>(
    ['cpu', nodeId],
    () => getCpuByNodeId(nodeId),
    options
  );
};

export default useNodeCpu;
