import { NodeCpuPropertiesEnum } from '../Enums/node-cpu-properties.enum';
import { NodeRamPropertiesEnum } from '../Enums/node-ram-properties.enum';

export enum Domain {
  nodeCpu = 'node_cpu',
  nodeRams = 'node_rams',
}

export interface Property {
  propertyName: NodeCpuPropertiesEnum | NodeRamPropertiesEnum;
  domain: Domain;
}

export interface NodeProperty {
  nodeUuid: string;
  property: Property;
}
