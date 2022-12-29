import { NodeProperty } from '../../../../../../../libs/shared/Types/NodeProperty';
import { ReportRequest } from '../../../../../../../libs/shared/Types/ReportRequest';
import { AggregationType } from '../reports.service';

export class ReportRequestDto implements ReportRequest {
  from: string;
  to: string;
  properties: NodeProperty[];
  aggregatePeriod: number;
}
