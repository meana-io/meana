import {IsString} from "class-validator";

export class CreateDto {
    @IsString()
    elo: string
}