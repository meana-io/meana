import { api } from '@/utility/api';
import { useQuery } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum LOGS {
  GET_LOGS = 'GET_LOGS',
}

export const useGetLogs = (nodeId: NodeId, fileType: string, options?) => {
  return useQuery(
    [LOGS.GET_LOGS, nodeId, fileType],
    () =>
      api.get<string>(
        `http://localhost:4200/${nodeId}/${fileType}`
        // `${apiRoutes.logs}/${nodeId}/${fileType}`
      ),
    options
  );
};
