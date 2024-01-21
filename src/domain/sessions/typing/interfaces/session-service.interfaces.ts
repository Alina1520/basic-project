import { UserRole } from "src/domain/users"
import { ISession } from "./session.interfaces"
import { ITokenPair } from "./token.interfaces"

export interface IStartSession{
    userId: number
	role?: UserRole
	roles?: UserRole[]
	deviceName: string
}


export interface ISessionService{
    start(payload:IStartSession):Promise<ISession>

    getByUserId(userId:number):Promise<ISession[]>
   
    getSessionsByTokens(refreshTokens: string[], selectFields?: string[]): Promise<ISession[]>

	refresh(token: string): Promise<ITokenPair>

	finish(token:string): Promise<void>

	// closeAllUserSessions(userId: number, execludeIds?: number[]): Promise<void>
}