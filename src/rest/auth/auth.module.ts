import { DynamicModule, Module } from "@nestjs/common";
import { SessionModule } from "src/domain/sessions/sessions.module";
import { UsersModule } from "src/domain/users/users.module";
import { JwtModule } from "src/jwt/jwt.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({})
export class AuthModule{
    static forRoot():DynamicModule{
        return {
            module:AuthModule,
            imports:[
                UsersModule.forFeature(),
                JwtModule.forFeature(),
                SessionModule.forFeature()
            ],
            providers:[AuthService],
            controllers:[AuthController]
        }
    }
}