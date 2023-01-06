import { IsOptional, IsString } from 'class-validator';

export interface NodeCpu {
  frequency?: string;
  coresQuantity?: string;
  manufacture?: string;
  model?: string;
  usage?: string;
  socketDesignation?: string;
  type?: string;
  cpuId?: string;
  version?: string;
  voltage?: string;
  externalClock?: string;
  maxSpeed?: string;
  status?: string;
  upgrade?: string;
  l1CacheHandle?: string;
  l2CacheHandle?: string;
  l3CacheHandle?: string;
  serialNumber?: string;
  assetTag?: string;
  partNumber?: string;
  coreEnabled?: string;
  threadCount?: string;
  characteristics?: string;
}
