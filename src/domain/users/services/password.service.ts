import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository, IUserService, USERS_REPOSITORY } from "../typing";
import * as bcrypt from "bcrypt"
import { ChangePassDto } from "src/rest/users/dto";

@Injectable()
export class PasswordService {
    @Inject(USERS_REPOSITORY) private readonly userRepository:IUserRepository

    public async comparePassword(password:string,id:number){
       const user  = await this.findOneWithPass(id)
       return password===user.password    
    }
    private async findOneWithPass(id:number){
        const user = await this.userRepository.findOne({
            where:{id:id},
            select:['id','password']
        })
        
        if(!user) throw new NotFoundException("User is not found")
        return user
}
public async changePassword(id:number,newPassword:string){
    const user  = await this.findOneWithPass(id)
    user.password = newPassword
    await this.userRepository.save(user)
}
}