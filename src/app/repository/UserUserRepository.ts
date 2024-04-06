import { AppDataSource } from "../../db/data-source";
import { UserUser } from '@entity/UserUser';

export const UserUserRepository = AppDataSource.getRepository(UserUser).extend({



});