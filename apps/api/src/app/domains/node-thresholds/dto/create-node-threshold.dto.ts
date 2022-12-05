import { IsNumber, IsUUID } from 'class-validator';

export class CreateNodeThresholdDto {
  @IsUUID()
  nodeUuid: string;

  @IsNumber()
  ramMin: number;

  @IsNumber()
  ramMax: number;

  @IsNumber()
  cpuMin: number;

  @IsNumber()
  cpuMax: number;
}
