import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum LOGS {
  GET_LOGS = 'GET_LOGS',
}

export const useGetLogs = (nodeId: NodeId, fileName: string, options?) => {
  return useQuery(
    [LOGS.GET_LOGS, nodeId, fileName],
    () =>
      api.get<string>(
        `${apiRoutes.logs}?nodeUuid=${nodeId}&filename=${fileName}`
      ),
    options
  );
};
