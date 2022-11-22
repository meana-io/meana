import { NodeProperty } from './NodeProperty';

export interface ReportRequest {
  from: string;
  to: string;
  properties: NodeProperty[];
  aggregatePeriod: number;
}
