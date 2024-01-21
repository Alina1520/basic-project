import { Repository } from "typeorm";
import { ISession } from "./session.interfaces";

export type ISessionRepository = Repository<ISession>