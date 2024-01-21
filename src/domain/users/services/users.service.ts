import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateUserPayload, IUser, IUserRepository, IUserService, USERS_REPOSITORY, UpdateUserPayload } from "../typing";
import { FindOptionsWhere } from "typeorm";
import * as _ from 'lodash'
import { PasswordService } from "./password.service";

@Injectable()
export class UserService implements IUserService{
    @Inject(USERS_REPOSITORY) private readonly userRepository:IUserRepository
    constructor(private readonly passwordService:PasswordService){}

public async create(payload: CreateUserPayload):Promise<number>{
    const exist = await this.userRepository.findOneBy({email:payload.email})
    if(exist) throw new BadRequestException('Email exist')
    
    const user = await this.userRepository.save({
        ...payload
    })
    return user.id
}
public async update(id: number, payload: UpdateUserPayload): Promise<IUser> { 
    let user = await this.userRepository.findOne({where:{id}}) 
    user = this.userRepository.merge(user,_.omit(payload))
    await this.userRepository.update(id,user)
    return user
}

public async getOneBy(where: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[]){
    return await this.userRepository.findOneBy(where)
}

public async getOneByEmail(email:string):Promise<IUser>{
    return await this.userRepository.findOneBy({email})
}

public async delete(id: number){
    const exist = await this.userRepository.findOneBy({id})
    if(!exist) throw new BadRequestException('User is not found')
    await this.userRepository.delete(id)
}

public  changePassword(id: number, newPassword: string){
    return this.passwordService.changePassword(id,newPassword)    
}

public comparePassword(userId: number, password: string){
    return this.passwordService.comparePassword(password,userId)
}
}