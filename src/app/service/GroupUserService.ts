import { GroupUserRepository } from "@repository/GroupUserRepository";
import { GroupUser } from '@entity/GroupUser';

export class GroupUserService {

    // Get all group users
    static async getGroupUsers(id: number): Promise<GroupUser[]> {
        return await GroupUserRepository.find({ where: { id } });
    }

    // Create (Add user to group)
    static async createGroupUser(groupId: number, values: Partial<GroupUser>): Promise<GroupUser> {
        // values.group_id = groupId;
        const newGroupUser = GroupUserRepository.create(values);
        return await GroupUserRepository.save(newGroupUser);
    }

    // Update (Edits user in group)
    static async updateGroupUser(id: number, groupUser: Partial<GroupUser>): Promise<GroupUser | null> {
        await GroupUserRepository.update(id, groupUser);
        return GroupUserRepository.findOne({ where: { id } });
    }

    // Delete (Deletes user in group)
    static async deleteGroupUser(id: number): Promise<void> {
        await GroupUserRepository.delete(id);
    }

}