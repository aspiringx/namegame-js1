import { GroupUserRepository } from "@repository/GroupUserRepository";
import { GroupUserEntity } from '@entity/GroupUserEntity';
import { DeleteResult } from "typeorm";

export class GroupUserService {

    // Get all group users
    static async getGroupUsers(groupId: number): Promise<GroupUserEntity[]> {
        return await GroupUserRepository.createQueryBuilder('group_users')
        .select(['*'])
        .where({ group_id: groupId })
        .execute();
    }

    // Create (Add user to group)
    static async createGroupUser(groupId: number, values: Partial<GroupUserEntity>): Promise<GroupUserEntity> {
        values.group_id = groupId;
        const newGroupUser = GroupUserRepository.create(values);
        return await GroupUserRepository.save(newGroupUser);
    }

    // Update (Edits user in group)
    static async updateGroupUser(groupId: number, userId: number, values: Partial<GroupUserEntity>): Promise<GroupUserEntity | null> {
        await GroupUserRepository.update({ group_id: groupId, user_id: userId }, values);
        return GroupUserRepository.findOne({ where: { group_id: groupId, user_id: userId } });
    }

    // Delete (Deletes user in group)
    static async deleteGroupUser(groupId: number, userId: number): Promise<DeleteResult> {
        return await GroupUserRepository.delete({ group_id: groupId, user_id: userId });
    }

}