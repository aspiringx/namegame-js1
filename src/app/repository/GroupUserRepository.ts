import { AppDataSource } from "../../db/data-source";
import { GroupUserEntity } from '@entity/GroupUserEntity';

export const GroupUserRepository = AppDataSource.getRepository(GroupUserEntity).extend({



});