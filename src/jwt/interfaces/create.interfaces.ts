import { UserRole } from "src/domain/users";

export interface ICreateTokenPayload{
		id : number|string,
		expiresIn?: string,
		role?: string,
		roles?: UserRole[],
		sessionId?: number,
}