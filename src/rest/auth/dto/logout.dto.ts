import { IsString } from 'class-validator'
import { DtoProperty } from 'src/decorators'

export class LogoutDto {
	@DtoProperty()
	@IsString()
	refreshToken: string
}