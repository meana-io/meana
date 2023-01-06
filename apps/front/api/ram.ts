import Ram from '@/types/ram';
import RamStick from '@/types/ramStick';
import { api } from '@/utility/api';
import { Params, pathToUrl } from '@/utility/router';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum RAM {
  GET_RAM = 'GET_RAM',
  GET_RAM_STICK = 'GET_RAM_STICK',
}

export const useGetNodeRam = (nodeId: NodeId, query?: Params, options?) => {
  return useQuery(
    [RAM.GET_RAM, nodeId, query?.limit ?? 50],
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

};export const useGetNodeRamStick = (nodeId: NodeId, query?: Params, options?) => {
  return useQuery(
    [RAM.GET_RAM_STICK, nodeId, query?.limit ?? 50],
    () =>
      api.get<RamStick[]>(
        `/node-ram-sticks/${nodeId}/get-latest`
      ),
    options
  );
};
