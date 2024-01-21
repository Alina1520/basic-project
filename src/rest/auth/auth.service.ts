import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserService, USERS_SERVICE } from "src/domain/users";
import { LoginPayloadDto } from "./dto/login.dto";
import { ITokenPair, SESSIONS_SERVICE } from "src/domain/sessions/typing";
import { SessionService } from "src/domain/sessions";
import { LogoutDto } from "./dto/logout.dto";
import { RefreshTokenDto } from "./dto";

@Injectable()
export class AuthService{
    @Inject(USERS_SERVICE) private readonly userService:IUserService
    @Inject(SESSIONS_SERVICE) private readonly sessionService:SessionService
    constructor(){}

    public async signIn(dto:LoginPayloadDto):Promise<ITokenPair>{
         const user = await this.userService.getOneByEmail(dto.email)
         if(!user) throw new UnauthorizedException('User is not found')

         const pass = await this.userService.comparePassword(user.id,dto.password)
         if(!pass) throw new UnauthorizedException('Password is incorrect')
         
         const session = await this.sessionService.start({
            userId:user.id,
            role:user.role,
            roles:user.roles,
            deviceName:user.name
         })
         
         return {accessToken:session.accessToken,refreshToken:session.refreshToken}
    }
    public async refresh(dto:RefreshTokenDto){
        return await this.sessionService.refresh(dto.refreshToken) 
    }
    public async logOut(dto:LogoutDto){
         return  await this.sessionService.finish(dto.refreshToken)
    }
}