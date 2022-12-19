import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column } from 'sequelize-typescript';

export class CreateNodeCpuDto {
  @IsUUID(4)
  @IsString()
  nodeId: string;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsString()
  @IsOptional()
  coresQuantity?: string;

  @IsString()
  @IsOptional()
  manufacture?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  usage?: string;

  @IsString()
  @IsOptional()
  socketDesignation?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  cpuId?: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  voltage?: string;

  @IsString()
  @IsOptional()
  externalClock?: string;

  @IsString()
  @IsOptional()
  maxSpeed?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  upgrade?: string;

  @IsString()
  @IsOptional()
  l1CacheHandle?: string;

  @IsString()
  @IsOptional()
  l2CacheHandle?: string;

  @IsString()
  @IsOptional()
  l3CacheHandle?: string;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsString()
  @IsOptional()
  assetTag?: string;

  @IsString()
  @IsOptional()
  partNumber?: string;

  @IsString()
  @IsOptional()
  coreEnabled?: string;

  @IsString()
  @IsOptional()
  threadCount?: string;

  @IsString()
  @IsOptional()
  characteristics?: string;
}
