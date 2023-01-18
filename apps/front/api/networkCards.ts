import NodeNetworkCards from '@/types/nodeNetworkCards';
import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum NETWORK_CARDS {
  GET_NETWORK_CARDS = 'GET_NETWORK_CARDS',
  GET_NETWORK_CARD = 'GET_NETWORK_CARD',
}

export const useGetNetworkCards = (nodeId: NodeId, options?) => {
  return useQuery(
    [NETWORK_CARDS.GET_NETWORK_CARDS, nodeId],
    () =>
      api.get<NodeNetworkCards[]>(
        `${apiRoutes.getLatestNetworkCard}/${nodeId}/get-latest`
      ),
    options
  );
};

export const useGetDashboardNetworkCards = (
  nodeId: NodeId,
  cardName: string,
  options?
) => {
  return useQuery(
    [NETWORK_CARDS.GET_NETWORK_CARD, nodeId, cardName],
    () =>
      api.get<NodeNetworkCards[]>(
        `${apiRoutes.getLatestNetworkCard}?limit=1&sort[]=time|DESC&filter[name]=${cardName}&filter[nodeUuid]=${nodeId}`
      ),
    options
  );
};
