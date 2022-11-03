import Cpu from '@/types/cpu';
import { api } from '@/utility/api';
import { Params, pathToUrl } from '@/utility/router';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum CPU {
  GET_CPU = 'GET_CPU',
}

export const useGetNodeCpu = (nodeId: NodeId, query?: Params, options?) => {
  return useQuery(
    [CPU.GET_CPU, nodeId],
    () =>
      api.get<Cpu[]>(
        pathToUrl(apiRoutes.nodeCpu, {
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
