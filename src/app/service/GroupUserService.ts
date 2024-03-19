import { GroupUserRepository } from "@repository/GroupUserRepository";
import { GroupUser } from '@entity/GroupUser';

export class GroupUserService {

    // Get all group users
    static async getGroupUsers(groupId: number): Promise<GroupUser[]> {
        return await GroupUserRepository.find({ where: { group_id: groupId } });
    }

    // Create (Add user to group)
    static async createGroupUser(groupId: number, values: Partial<GroupUser>): Promise<GroupUser> {
        values.group_id = groupId;
        const newGroupUser = GroupUserRepository.create(values);
        return await GroupUserRepository.save(newGroupUser);
    }

    // Update (Edits user in group)
    static async updateGroupUser(groupId: number, userId: number, values: Partial<GroupUser>): Promise<GroupUser | null> {
        await GroupUserRepository.update({ group_id: groupId, user_id: userId }, values);
        return GroupUserRepository.findOne({ where: { group_id: groupId, user_id: userId } });
    }

    // Delete (Deletes user in group)
    static async deleteGroupUser(groupId: number, userId: number): Promise<void> {
        await GroupUserRepository.delete({ group_id: groupId, user_id: userId });
    }

}