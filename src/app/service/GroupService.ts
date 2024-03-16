import { GroupRepository } from "@repository/GroupRepository";
import { Group } from '@entity/Group';

export class GroupService {

    // Get group by id
    static async getGroup(id: number): Promise<Group | null> {
        return await GroupRepository.findOne({ where: { id } });
    }

    // Get all groups
    static async getAllGroups(): Promise<Group[]> {
        return await GroupRepository.find();
    }

    // Create
    static async createGroup(Group: Partial<Group>): Promise<Group> {
        const newGroup = GroupRepository.create(Group);
        return await GroupRepository.save(newGroup);
    }

    // Update
    static async updateGroup(id: number, Group: Partial<Group>): Promise<Group | null> {
        await GroupRepository.update(id, Group);
        return GroupRepository.findOne({ where: { id } });
    }

    // Delete
    static async deleteGroup(id: number): Promise<void> {
        await GroupRepository.delete(id);
    }

}
