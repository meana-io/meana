import NodeReport, { NodeReportProperty } from '@/types/nodeReport';
import { api } from '@/utility/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRoutes } from 'routes';

type NodeId = string;

export enum NODE_REPORT {
  GET_NODE_REPORT = 'GET_NODE_REPORT',
}

export interface CreateNodeReport {
  from: string;
  to: string;
  properties: [
    {
      nodeUuid: string;
      property: NodeReportProperty;
    }
  ];
  aggregatePeriod: number;
}

export const useCreateNodeReport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateNodeReport) =>
      api.post<NodeReport>(apiRoutes.nodeReport, data),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([NODE_REPORT.GET_NODE_REPORT]);
      },
    }
  );
};
