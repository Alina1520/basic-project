import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { removeBearerFrom } from "src/database";
import { JwtService } from "src/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const {headers} = request
        const token = removeBearerFrom(headers.authorization)
        if(!token) throw new UnauthorizedException()
       
        const decoded = this.jwtService.decodeToken(token)
        if(!decoded) throw new UnauthorizedException()

        request.userId = decoded.id
		request.role = decoded.role
		request.roles = decoded.roles
		request.sessionId = decoded.sessionId
        return true     
    }
}