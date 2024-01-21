import { Repository } from "typeorm";
import { IContacts, IUser } from "./users.interfaces";

export type IUserRepository = Repository<IUser>
export type IContactRepository = Repository<IContacts>