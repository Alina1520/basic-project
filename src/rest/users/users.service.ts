import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StoreStudentPayloadDto, UpdateStudentPayloadDto } from './dto/store-user.dto';
import { CONTACTS_SERVICE, CreateContactsPayload, IContactsService, IUserService,  USERS_SERVICE, UserRole } from 'src/domain/users/typing';
import * as randomstring from "randomstring"

@Injectable()
export class RestUsersService {
    @Inject(USERS_SERVICE) private readonly userService:IUserService
    @Inject(CONTACTS_SERVICE) private readonly contactsService:IContactsService
  
  public async storeStudent(usersId: number, dto: StoreStudentPayloadDto) {
    const existedEmail = await this.userService.getOneByEmail(dto.email);

    if(existedEmail) throw new BadRequestException('Email already exist')
    const password = randomstring.generate(6)
  
  const newUser = await this.saveUser(
       UserRole.Student,
			[UserRole.Student],
			password,
			{ ...dto },
  )
  return newUser;
  }  
  
  public async updateStudent(id:number,dto:UpdateStudentPayloadDto){
    const user = await this.updateUser(id,UserRole.Student,dto)
    return user.id
  }
  public async changePassword(id:number,newPassword:string){
    await this.userService.changePassword(id,newPassword)
  }
  public async deleteUser(id:number){
    await this.userService.delete(id);
  }
public async createContacts(userId:number,dto:CreateContactsPayload){
   return await this.contactsService.createContacts(dto,userId)
}
public async getUserByContact(id:number){
  const user = await this.userService.getOneBy({id:id})
  if(!user) throw new NotFoundException("User is ot found")
 return await this.contactsService.getUserContacts(user.id);
}
  private async saveUser(
    role: UserRole,
    roles: UserRole[],
    password: string,
    dto: {
      email?: string
      name?: string,
    },
  ){
    return  await this.userService.create({
         role,
         roles,
         email:dto.email,
         password,
         name:dto.name
    })
  }
  private async updateUser(
    userId:number,
    role:UserRole,
    dto: {
			email?: string
			name?: string
		}
  )
  {
    return await this.userService.update(userId,{
      roles:[role],
      email:dto.email,
      name:dto.name
    })
  }

  
}
