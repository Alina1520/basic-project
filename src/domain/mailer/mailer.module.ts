import { DynamicModule, Module } from '@nestjs/common'
import { MailerModule as Mailer } from '@nestjs-modules/mailer'
import { MailerService } from './services'
import { IMailerModuleOptions, MAILER_SERVICE } from './typing'
import { provideClass, provideEntity } from 'src/database'

// @Module({})
// export class MailerModule {
// 	static forRoot(): DynamicModule {
// 		return {
// 			module: MailerModule,
// 			providers: [provideEntity(MAILER_SERVICE,)],
// 		}
// 	}

// 	}

