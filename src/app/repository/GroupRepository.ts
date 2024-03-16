import { AppDataSource } from "../../db/data-source";
import { Group } from '@entity/Group';

export const GroupRepository = AppDataSource.getRepository(Group).extend({

    

});