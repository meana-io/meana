import Ram from '@/types/ram';
import { api } from '@/utility/api';
import { Params, pathToUrl } from '@/utility/router';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum RAM {
  GET_RAM = 'GET_RAM',
}

export const useGetNodeRam = (nodeId: NodeId, query?: Params, options?) => {
  return useQuery(
    [RAM.GET_RAM, nodeId],
    () =>
      api.get<Ram[]>(
        pathToUrl(apiRoutes.nodeRam, {
          search: {
            nodeId,
          },
          sort: ['time', 'DESC'],
          limit: 50,
          ...query,
        })
      ),
    options
  );
};
