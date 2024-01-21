import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CONTACTS_REPOSITORY, CreateContactsPayload, IContactRepository, IContacts, IContactsService, USERS_REPOSITORY, USERS_SERVICE, UpdateContactsPayload } from "../typing";
import { UserService } from "./users.service";

@Injectable()
export class ContactsService implements IContactsService{
    @Inject(CONTACTS_REPOSITORY) private readonly contactsRepository:IContactRepository
    @Inject(USERS_SERVICE) private readonly userService:UserService
    public async createContacts(payload: CreateContactsPayload,userId:number):Promise<IContacts> {
        const user = await this.userService.getOneBy({id:userId})
        if(!user) throw new NotFoundException()

         const contacts = this.contactsRepository.create({
            user:user,
           ...payload
        })
        return await this.contactsRepository.save(contacts)
    }
    public async updateContacts(payload: UpdateContactsPayload, id: number){
        const query = await this.contactsRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","user")
        .where("user.id=:id",{id})
        .getOne()
        if(!query) throw new NotFoundException("User is not found")
        console.log(query)
    }
    public async deleteContacts(userId: number): Promise<void> {
        await this.contactsRepository.delete(userId)
    }
    public async getUserContacts(userId: number) {
        const user = await this.userService.getOneBy({id:userId})
        if(!user) throw new NotFoundException()
        const query = await this.contactsRepository
        .createQueryBuilder("it")
        .select(["it.phoneNumber"])
        .leftJoin("it.user","user")
        .where("user.id=:userId",{userId})
        .getOneOrFail()

        return {phoneNumber:query.phoneNumber}
    }
}