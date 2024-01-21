import { DynamicModule, Global, Module } from "@nestjs/common";
import { provideClass, provideEntity } from "src/database";
import { SESSIONS_SERVICE, SESSION_REPOSITORY } from "./typing";
import { Session } from "./entities";
import { SessionService } from "./services/session.service";
import { JwtModule } from "src/jwt/jwt.module";
import { AuthGuard, RolesGuard } from "./guards";

@Global()
@Module({})
export class SessionModule{
    static getProviders(){
        return [
            provideEntity(SESSION_REPOSITORY,Session),
            provideClass(SESSIONS_SERVICE,SessionService),
            AuthGuard,
            RolesGuard
            ]
    }
    static getImports(){
        return [JwtModule.forFeature()]
    }
    static getExports(){
        return [SESSIONS_SERVICE]
    }
    static forRoot():DynamicModule{
        return {
        module:SessionModule,
        imports:SessionModule.getImports(),
        providers:SessionModule.getProviders(),
        exports:SessionModule.getExports()
        }
    }
    static forFeature():DynamicModule{
        return {
        module:SessionModule,
        imports:SessionModule.getImports(),
        providers:SessionModule.getProviders(),
        exports:SessionModule.getExports()
        }
    }
}