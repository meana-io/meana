import NodePackage from '@/types/nodePackage';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum NODE_PACKAGES {
  GET_NODE_PACKAGES = 'GET_NODE_PACKAGES',
}

export const useGetNodePackages = (nodeId: NodeId, options?) => {
  return useQuery(
    [NODE_PACKAGES.GET_NODE_PACKAGES, nodeId],
    () =>
      api.get<NodePackage[]>(`${apiRoutes.nodePackages}?nodeUuid=${nodeId}`),
    options
  );
};
