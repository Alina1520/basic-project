import { User } from "../../entities/user.entity"
import { UserRole } from "../enum"

export interface IUser{
    id: number
	role: UserRole
	roles: UserRole[]
	email: string
	name: string
	password: string
	createdAt: string
	updatedAt: string
}

export interface IContacts{
	id:number
    user:IUser
	phoneNumber: string
	birthday: Date
	country: string
	city: string
	createdAt: string
	updatedAt: string
}

