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

const data = {
  from: '2022-11-06 21:18:11+00',
  to: '2022-11-12 20:00:00+00',
  properties: [
    {
      nodeUuid: '73491d88-8727-4d47-bad7-31b8fef89ac4',
      property: {
        domain: 'node_cpu',
        propertyName: 'frequency',
      },
    },
    {
      nodeUuid: '73491d88-8727-4d47-bad7-31b8fef89ac4',
      property: {
        domain: 'node_cpu',
        propertyName: 'coresQuantity',
      },
    },
  ],
  aggregatePeriod: 86400,
};

export const useCreateNodeReport = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (_data: CreateNodeReport) =>
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
};;
