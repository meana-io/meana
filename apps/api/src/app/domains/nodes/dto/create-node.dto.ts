import {IsString} from "class-validator";

export class CreateNodeDto {
    @IsString()
    name: string
}
