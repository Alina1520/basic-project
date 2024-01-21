import { IsString } from "class-validator";
import { DtoProperty } from "src/decorators";

export class ChangePassDto{
    @DtoProperty()
    @IsString()
    password:string
}