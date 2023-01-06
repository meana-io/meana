import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNodeDeviceDto {
  @IsUUID(4)
  @IsString()
  nodeUuid: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  port?: string;
}
