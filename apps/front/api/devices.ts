import NodeDevice from '@/types/nodeDevice';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum DEVICES {
  GET_DEVICES = 'GET_DEVICES',
}

export const useGetNodeDevices = (nodeId: NodeId, options?) => {
  return useQuery(
    [DEVICES.GET_DEVICES, nodeId],
    () =>
      api.get<NodeDevice[]>(
        `${apiRoutes.getLatestNodeDevices}/${nodeId}/get-latest`
      ),
    options
  );
};
