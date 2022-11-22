import { NodeProperty } from '../../../../../../../libs/shared/Types/NodeProperty';
import { ReportRequest } from '../../../../../../../libs/shared/Types/ReportRequest';

export class ReportRequestDto implements ReportRequest {
  from: string;
  to: string;
  properties: NodeProperty[];
  aggregatePeriod: number;
}
