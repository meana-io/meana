import {IsOptional, IsString, IsUUID} from "class-validator";

export class CreateNodeDiskDto {
    @IsUUID(4)
    @IsString()
    node: string

    @IsString()
    path?: string

    @IsString()
    @IsOptional()
    manufacture?: string

    @IsString()
    @IsOptional()
    model?: string

    @IsString()
    @IsOptional()
    serialNumber?: string

    @IsString()
    @IsOptional()
    capacity?: string

    @IsString()
    @IsOptional()
    firmwareVersion?: string
}
