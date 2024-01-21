import { SESSION_ENTITIES } from "src/domain/sessions";
import { USER_ENTITIES } from "src/domain/users";


export const ENTITIES = [
    ...USER_ENTITIES,
    ...SESSION_ENTITIES,
]