import { FindOptionsWhere } from "typeorm"
import { UserRole } from "../enum"
import { IUser } from "./users.interfaces"

export interface CreateUserPayload {
	role: UserRole
	roles: UserRole[]
	email: string
	password: string
	name: string
}

export interface UpdateUserPayload {
	roles?: UserRole[]
	email?: string
	name?: string
}

export interface IUserService {
    create(payload:CreateUserPayload):Promise<number>
    update(id:number,payload:UpdateUserPayload):Promise<IUser>
    delete(id:number):Promise<void>
    getOneByEmail(email:string):Promise<IUser>
    comparePassword(userId:number,password:string)
    getOneBy(where:FindOptionsWhere<IUser> |FindOptionsWhere<IUser>[]):Promise<IUser>
    changePassword(id:number,newPassword:string)
}