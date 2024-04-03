import { GroupRepository } from "@repository/GroupRepository";
import { GroupEntity } from '@entity/GroupEntity';

export class GroupService {

    // Get group by id
    static async getGroup(id: number): Promise<GroupEntity | null> {
        return await GroupRepository.findOne({ where: { id } });
    }

    // Get all groups
    static async getAllGroups(): Promise<GroupEntity[]> {
        return await GroupRepository.find();
    }

    // Create
    static async createGroup(Group: Partial<GroupEntity>): Promise<GroupEntity> {
        const newGroup = GroupRepository.create(Group);
        return await GroupRepository.save(newGroup);
    }

    // Update
    static async updateGroup(id: number, Group: Partial<GroupEntity>): Promise<GroupEntity | null> {
        await GroupRepository.update(id, Group);
        return GroupRepository.findOne({ where: { id } });
    }

    // Delete
    static async deleteGroup(id: number): Promise<void> {
        await GroupRepository.delete(id);
    }

}
