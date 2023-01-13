import NodeUser from '@/types/nodeUser';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum NODE_USERS {
  GET_NODE_USERS = 'GET_NODE_USERS',
}

export const useGetNodeUsers = (nodeId: NodeId, options?) => {
  return useQuery(
    [NODE_USERS.GET_NODE_USERS, nodeId],
    () => api.get<NodeUser>(`${apiRoutes.nodeUsers}?nodeUuid=${nodeId}`),
    options
  );
};
