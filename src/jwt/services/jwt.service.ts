import { Inject, Injectable } from "@nestjs/common";
import { JWT_KEY, JWT_PAYLOAD_KEY } from "../const";
import { ICreateTokenPayload } from "../interfaces/create.interfaces";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService{
@Inject(JWT_KEY)
private jwtKey:string

@Inject(JWT_PAYLOAD_KEY)
private jwtPayloadKey: string

public createTokens({
    id,
    expiresIn = '360s',
    role,
    roles,
    sessionId,
}:ICreateTokenPayload):string{
    const payload = {
        sub: JSON.stringify({
                id,
                role,
                roles,
                sessionId,
            })
       
    }
return jwt.sign(payload, this.jwtKey, expiresIn ? { expiresIn } : {})
}

public decodeToken(token: string) {
    try {
        const result = jwt.verify(token, this.jwtKey)
        if (!result) return null

        const decrypted = JSON.parse(result.sub as string)

        return {
            id: decrypted.id,
            role: decrypted.role,
            roles: decrypted.roles,
            sessionId: decrypted.sessionId,
        }
    } catch (e) {
        return null
    }
}
}