import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNodeRamStickDto {
  @IsUUID(4)
  @IsString()
  nodeUuid: string;

  @IsString()
  @IsOptional()
  arrayHandle?: string;

  @IsString()
  @IsOptional()
  errorInformationHandle?: string;

  @IsString()
  @IsOptional()
  totalWidth?: string;

  @IsString()
  @IsOptional()
  dataWidth?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  formFactor?: string;

  @IsString()
  @IsOptional()
  ramSet?: string;

  @IsString()
  @IsOptional()
  locator?: string;

  @IsString()
  @IsOptional()
  bankLocator?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  typeDetail?: string;

  @IsString()
  @IsOptional()
  speed?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

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
  rank?: string;

  @IsString()
  @IsOptional()
  configuredMemorySpeed?: string;

  @IsString()
  @IsOptional()
  minimumVoltage?: string;

  @IsString()
  @IsOptional()
  maximumVoltage?: string;

  @IsString()
  @IsOptional()
  configuredVoltage?: string;
}
