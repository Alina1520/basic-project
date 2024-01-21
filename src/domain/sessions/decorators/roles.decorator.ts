import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common"
import { AuthGuard,RolesGuard } from "../guards"

export const RoleGuard = (...roles:string[])=>
    applyDecorators(SetMetadata('roles',roles),UseGuards(AuthGuard,RolesGuard))
