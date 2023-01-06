import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNodeNetworkCardDto {
  @IsUUID(4)
  @IsString()
  nodeUuid: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  macAddress?: string;

  @IsString()
  @IsOptional()
  ipv4?: string;

  @IsString()
  @IsOptional()
  ipv6?: string;
}
