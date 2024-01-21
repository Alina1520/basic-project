import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ISession, ISessionRepository, ISessionService, IStartSession, ITokenPair, SESSION_REPOSITORY } from "../typing";
import { JwtService } from "src/jwt";
import { UserRole } from "src/domain/users";
import * as _ from 'lodash'

@Injectable()
export class SessionService implements ISessionService{
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository:ISessionRepository
    constructor(private readonly jwtService:JwtService){}
    public async start(payload: IStartSession): Promise<ISession> {
        const session = {
            accessToken:' ',
            refreshToken:' ',
            deviceName:payload.deviceName,
            userId:payload.userId
        }
        const resultInsert = await this.sessionRepository.insert(session)
        const sessionId = resultInsert.identifiers[0].id

        const tokens =  this.generateToken(payload.userId,payload.role,payload.roles,sessionId)

        await this.sessionRepository.update(sessionId,tokens)

        return {
            ...session,
            ...tokens
        }
    }
    public async getByUserId(userId: number): Promise<ISession[]> {
        return await this.sessionRepository.findBy({userId})
    }
    public async refresh(refreshToken: string) {
        const session = await this.sessionRepository.findOneBy({refreshToken})
        if(!session) throw new NotFoundException('Session is not found')
        
        const decode = this.jwtService.decodeToken(refreshToken)
        const tokens = this.generateToken(session.userId,decode.role,decode.roles,session.id)
        
        await this.sessionRepository.save({
            id: session.id,
			userId: session.userId,
			...tokens,
        })
        return tokens
    }
    public async getSessionsByTokens(refreshTokens: string[], selectFields?: string[]): Promise<ISession[]> {
        if(!_.isArray(refreshTokens) || !refreshTokens.length) return []

        const query =  this.sessionRepository
        .createQueryBuilder("it")
        .where("it.refreshToken=ANY(:refreshToken)",{refreshTokens})

        if (!_.isEmpty(selectFields)) {
			query.select(_.map(selectFields, it => `it.${it}`))
		}
        return query.getMany()
    }
    public async finish(token: string): Promise<void> {
        const session = await this.sessionRepository
        .createQueryBuilder('it')
        .where('it.refreshToken = :token', { token })
        .orWhere('it.accessToken = :token', { token })
        .getOne()

    if (!session) throw new NotFoundException('Sessions not found')

    await this.delete(session)

    }
    private async delete(session:ISession){
        await this.sessionRepository.delete(session.id)
    }
    private generateToken(userId: number, role: UserRole, roles: UserRole[], sessionId: number){
        return {
         accessToken : this.jwtService.createTokens({id:userId,role,roles,sessionId}),
         refreshToken : this.jwtService.createTokens(
            {
                id:`_${userId}`,
                role,
                roles,
                sessionId,
                expiresIn:null
            })
        }
    }
}