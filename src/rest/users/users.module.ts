import { DynamicModule, Global, Module } from '@nestjs/common';
import { RestUsersController } from './users.controller';
import { RestUsersService } from './users.service';
import { UsersModule } from 'src/domain/users/users.module';

@Global()
@Module({})
export class RestUsersModule {
	static forRoot(): DynamicModule {
		return {
			module: RestUsersModule,
			imports: [
				UsersModule.forFeature(),
			],
			controllers: [RestUsersController],
			providers: [RestUsersService],
		}
	}
}
