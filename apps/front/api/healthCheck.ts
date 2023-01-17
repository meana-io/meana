import NodeDevice from '@/types/nodeDevice';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

export enum HEALTH_CHECK {
  HEALTH_CHECK = 'CHECK',
}

type NodeId = string;

export enum DEVICES {
  GET_DEVICES = 'GET_DEVICES',
}

export const useGetHealthCheck = (nodeId: NodeId, options?) => {
  return useQuery(
    [HEALTH_CHECK.HEALTH_CHECK, nodeId],
    () =>
      api.get<NodeDevice[] | string>(
        `${apiRoutes.getLatestNodeDevices}/${nodeId}/get-latest`
      ),
    options
  );
};
