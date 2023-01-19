import { NodeCpuPropertiesEnum } from '../Enums/node-cpu-properties.enum';
import { NodeRamPropertiesEnum } from '../Enums/node-ram-properties.enum';
import { NodeDiskPartitionPropertiesEnum } from '../Enums/node-disk-partition-properties.enum';
import { AggregationType } from '../../../apps/api/src/app/domains/reports/reports.service';

export enum Domain {
  nodeCpu = 'node_cpu',
  nodeRams = 'node_rams',
  nodeDiskPartitions = 'node_disk_partitions',
}

export interface Property {
  propertyName:
    | NodeCpuPropertiesEnum
    | NodeRamPropertiesEnum
    | NodeDiskPartitionPropertiesEnum;
  domain: Domain;
  aggregationType: AggregationType;
}

export interface NodeProperty {
  nodeUuid: string;
  diskIdentifier: string;
  property: Property;
}
