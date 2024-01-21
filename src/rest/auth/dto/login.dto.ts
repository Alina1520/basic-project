import { IsString } from "class-validator";
import { DtoProperty } from "src/decorators";

export class LoginPayloadDto{
    @DtoProperty()
    email:string;
    
    @DtoProperty()
    @IsString()
    name:string;

    @DtoProperty()
    password:string;
}