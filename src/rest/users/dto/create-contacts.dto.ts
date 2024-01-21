import { DtoProperty, DtoPropertyOptional } from "src/decorators"

export class CreateContactsDto{
    @DtoProperty()
    phoneNumber: string
    @DtoProperty()
	birthday: Date
    @DtoProperty()
	country: string
    @DtoProperty()
	city: string
}
export class UpdateContactsDto{
    @DtoPropertyOptional()
    phoneNumber: string
    @DtoPropertyOptional()
	birthday: Date
    @DtoPropertyOptional()
	country: string
    @DtoPropertyOptional()
	city: string
}
