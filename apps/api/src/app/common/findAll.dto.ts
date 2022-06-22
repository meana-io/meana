import {IsObject, IsOptional} from "class-validator";

interface Where {
    [key: string]: string
}

export class FindAllDto {
    @IsObject()
    @IsOptional()
    where: Where
}
