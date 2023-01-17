import NodeNetworkCards from '@/types/nodeNetworkCards';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';

type NodeId = string;

export enum NETWORK_CARDS {
  GET_NETWORK_CARDS = 'GET_NETWORK_CARDS',
}

export const useGetNetworkCards = (nodeId: NodeId, options?) => {
  return useQuery(
    [NETWORK_CARDS.GET_NETWORK_CARDS, nodeId],
    () =>
      api.get<NodeNetworkCards[]>(`/node-network-cards/${nodeId}/get-latest`),
    options
  );
};
