import {IsString, IsUUID} from "class-validator";

export class CreateNodeDto {
    @IsString()
    name: string
}
