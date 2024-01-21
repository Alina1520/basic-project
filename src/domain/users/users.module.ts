import { DynamicModule, Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./services/users.service";
import { provideClass, provideEntity } from "src/database";
import { CONTACTS_REPOSITORY, CONTACTS_SERVICE, USERS_REPOSITORY, USERS_SERVICE } from "./typing";
import { PasswordService } from "./services/password.service";
import { Contacts } from "./entities/contacts.entity";
import { ContactsService } from "./services/contacts.service";

@Global()
@Module({})
export class UsersModule{
    static getProviders(){
        return [
          provideClass(USERS_SERVICE,UserService),
          provideClass(CONTACTS_SERVICE,ContactsService),
          provideEntity(USERS_REPOSITORY,User),
          provideEntity(CONTACTS_REPOSITORY,Contacts),
          PasswordService
        ]
    }
    static getExports(){
        return [
            USERS_REPOSITORY,
            USERS_SERVICE,
            CONTACTS_REPOSITORY,
            CONTACTS_SERVICE
        ]
    }

    static getImports(){
        return []
    }

	static forRoot(): DynamicModule {
		return {
			module: UsersModule,
			providers: UsersModule.getProviders(),
			imports: UsersModule.getImports(),
			exports: UsersModule.getExports(),
		}
	}
    static forFeature(): DynamicModule {
		return {
			module: UsersModule,
			providers: UsersModule.getProviders(),
			imports: UsersModule.getImports(),
			exports: UsersModule.getExports(),
		}
	}
}

