import { Module } from '@nestjs/common';
import { RestUsersModule } from './rest/users/users.module';
import { UsersModule } from './domain/users/users.module';
import { DatabaseModule } from './database/database.module';
import { $config } from './config';
import { AuthModule } from './rest/auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { SessionModule } from './domain/sessions';


const imports = [
  DatabaseModule.forRoot(...$config.getDatabaseConfig()),
  JwtModule.forRoot($config.getJwtConfig()),
  UsersModule.forRoot(),
  RestUsersModule.forRoot(),
  AuthModule.forRoot(),
  SessionModule.forRoot()
]

@Module({imports})
export class AppModule {}
