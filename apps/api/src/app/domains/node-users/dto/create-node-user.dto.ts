import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNodeUserDto {
  @IsUUID(4)
  @IsString()
  nodeUuid: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  groups?: string[];
}
