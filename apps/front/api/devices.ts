import NodeDevice from '@/types/nodeDevice';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum DEVICES {
  GET_DEVICES = 'GET_DEVICES',
  GET_DEVICE = 'GET_DEVICE',
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

export const useGetDashboardDevice = (
  nodeId: NodeId,
  deviceName: string,
  options?
) => {
  return useQuery(
    [DEVICES.GET_DEVICE, nodeId],
    () =>
      api.get<NodeDevice[]>(
        `${apiRoutes.getLatestNodeDevices}?limit=1&sort[]=time|DESC&filter[name]=${deviceName}&filter[nodeUuid]=${nodeId}`
      ),
    options
  );
};
