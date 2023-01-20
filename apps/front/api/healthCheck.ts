import NodeHealth from '@/types/nodeHealth';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

export enum HEALTH_CHECK {
  HEALTH_CHECK = 'CHECK',
}

type NodeId = string;

export const useGetHealthCheck = (nodeId: NodeId, options?) => {
  return useQuery(
    [HEALTH_CHECK.HEALTH_CHECK, nodeId],
    () => api.get<NodeHealth>(`${apiRoutes.nodeHealth}/${nodeId}`),
    options
  );
};
