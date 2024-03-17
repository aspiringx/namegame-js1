import { AppDataSource } from "../../db/data-source";
import { GroupUser } from '@entity/GroupUser';

export const GroupUserRepository = AppDataSource.getRepository(GroupUser).extend({



});