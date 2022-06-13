import {IsOptional, IsString, IsUUID} from "class-validator";

export class CreateNodeRamDto {
    @IsUUID(4)
    @IsString()
    nodeId: string

    @IsString()
    @IsOptional()
    total?: string

    @IsString()
    @IsOptional()
    used?: string
}
