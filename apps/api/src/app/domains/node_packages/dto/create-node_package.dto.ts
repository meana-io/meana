import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNodePackageDto {
  @IsUUID(4)
  @IsString()
  nodeUuid: string;

  @IsString()
  @IsOptional()
  packageName?: string;

  @IsOptional()
  packageVersion?: string;
}
