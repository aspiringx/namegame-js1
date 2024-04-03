import { AppDataSource } from "../../db/data-source";
import { GroupEntity } from '@entity/GroupEntity';

export const GroupRepository = AppDataSource.getRepository(GroupEntity).extend({

    

});