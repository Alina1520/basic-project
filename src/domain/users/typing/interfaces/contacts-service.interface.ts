import { IContacts, IUser } from "./users.interfaces"

export class CreateContactsPayload{
    phoneNumber: string
	birthday: Date
	country: string
	city: string
}
export class UpdateContactsPayload{
    phoneNumber?: string
	birthday?: Date
	country?: string
	city?: string
}

export interface IContactsService{
createContacts(payload:CreateContactsPayload,userId:number):Promise<IContacts>
updateContacts(payload:UpdateContactsPayload,userId:number)
deleteContacts(userId:number):Promise<void>
getUserContacts(userId:number)
}