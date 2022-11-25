export interface NodeReportProperty {
  domain: string;
  propertyName: string;
}

export interface NodeReportResult {
  aggregation_period: string;
  avg: string;
}

export default interface NodeReport {
  nodeUuid: string;
  property: NodeReportProperty;
  result: NodeReportResult[];
}
