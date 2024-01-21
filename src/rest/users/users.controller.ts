import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RestUsersService } from './users.service';
import { StoreStudentPayloadDto } from './dto/store-user.dto';
import { ReqUser } from 'src/decorators';
import { UserRole } from 'src/domain/users';
import { RoleGuard } from 'src/domain/sessions/decorators';
import { CreateContactsDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class RestUsersController {
    constructor(private readonly userService:RestUsersService){}
    @ApiOperation({summary:"Store user"})
    @ApiResponse({
      status:201,
      description:"Store user",
      type:StoreStudentPayloadDto
    })
    @RoleGuard(UserRole.SuperAdmin, UserRole.Owner)
    @Post()
    public  store(@Body() dto:StoreStudentPayloadDto, @ReqUser() userId:number){
      return this.userService.storeStudent(userId,dto)
    }
    @Patch('change-password/:id')
    public async changePass(@Param('id') id:number,@Body() body:{password:string}){
      return await this.userService.changePassword(id,body.password)  
    }
    @Delete(':id')
    public async delete(@Param("id") id:number){
      return await this.userService.deleteUser(id)
    }
    @Post(":id")
    public async createContact(@Param("id") id:number,@Body() dto:CreateContactsDto){
      return await this.userService.createContacts(id,dto)
    }
    @Get(":id")
    public async getUserByContact(@Param("id") id:number){
      return await this.userService.getUserByContact(id)
    }
  }