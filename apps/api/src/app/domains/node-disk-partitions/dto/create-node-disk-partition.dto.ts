import {IsOptional, IsString, IsUUID} from "class-validator";

export class CreateNodeDiskPartitionDto {
    @IsUUID(4)
    @IsString()
    nodeDisk: string

    @IsString()
    @IsOptional()
    path?: string

    @IsString()
    @IsOptional()
    usedSpace?: string

    @IsString()
    @IsOptional()
    capacity?: string

    @IsString()
    @IsOptional()
    fileSystem?: string

    @IsString()
    @IsOptional()
    name?: string
}
