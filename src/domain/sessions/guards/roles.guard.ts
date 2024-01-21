import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}
    public canActivate(context: ExecutionContext):boolean {
        let {roles} = context.switchToHttp().getRequest() //[ 'sa' ]
        if(!roles) roles = context.switchToHttp().getRequest().role

        const rolesRequired = this.reflector.get<string[]>('roles',context.getHandler())//[ 'sa', 'o' ]
        console.log('rolesRequired ',rolesRequired)
        if(!roles.length) return true
        
        const hasMatchingRole = rolesRequired.some(r=>roles.includes(r)) //true
        return hasMatchingRole
    }
}