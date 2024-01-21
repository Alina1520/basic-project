import { IsString } from "class-validator";
import { DtoProperty } from "src/decorators";

export class RefreshTokenDto{
    @DtoProperty()
    @IsString()
    refreshToken:string
}