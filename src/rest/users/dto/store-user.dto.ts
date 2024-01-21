import { DtoProperty, DtoPropertyOptional } from "src/decorators"
import { Gender } from "src/domain/users/typing/enum"

export class StoreStudentPayloadDto {
	//for create-user
	@DtoProperty()
	email: string
	@DtoProperty()
	name: string
	@DtoPropertyOptional({ type: 'varchar' })
	gender?: Gender

}

export class UpdateStudentPayloadDto {
	@DtoPropertyOptional()
	email: string
	@DtoPropertyOptional()
	name: string
}
