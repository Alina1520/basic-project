import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginPayloadDto } from "./dto/login.dto";
import { LogoutDto } from "./dto/logout.dto";
import { RefreshTokenDto } from "./dto";
import { AuthGuard } from "src/domain/sessions/decorators";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("Authentication")
@Controller("auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}
    @ApiOperation({summary:"Login user"})
    @ApiResponse({
        type:LoginPayloadDto,
        description:"Login user",
        status:201
    })
    @Post("login")
    public async logIn(@Body() dto:LoginPayloadDto){
         return await this.authService.signIn(dto)
    }
    @Post('logout')
    @AuthGuard()
	public async logout(@Body() dto: LogoutDto) {
		return await this.authService.logOut(dto)
	}
    @Post('refresh-token')
	public async refreshToken(@Body() dto: RefreshTokenDto) {
		return await this.authService.refresh(dto)
	}
}