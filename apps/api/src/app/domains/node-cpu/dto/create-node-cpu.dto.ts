import { IsOptional, IsString, IsUUID } from 'class-validator';

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
}
