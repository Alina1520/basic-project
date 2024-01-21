import { Connection } from "typeorm"

export const provideEntity = (name, entity) => {
	return {
		provide: name,
		useFactory: (connection: Connection) => connection.getRepository(entity),
		inject: [Connection],
	}
}