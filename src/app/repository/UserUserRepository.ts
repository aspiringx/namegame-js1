import { AppDataSource } from "../../db/data-source";
import { UserUserEntity } from '@entity/UserUserEntity';

export const UserUserRepository = AppDataSource.getRepository(UserUserEntity).extend({



});