import { GroupUserService } from "@service/GroupUserService";
import { GroupUserEntity } from '@entity/GroupUserEntity';

interface createGroupUserPayload {
    values: object
}

interface updateGroupUserPayload {
    id: number,
    values: object
}

export class GroupUserController {

    static async getGroupUsers(group_id: number) {
        return GroupUserService.getGroupUsers(group_id);
    }

    static async createGroupUser(groupId: number, payload: unknown): Promise<GroupUserEntity> {
        const data = <createGroupUserPayload>payload;
        return GroupUserService.createGroupUser(groupId, data.values);
    }

    static async updateGroupUser(groupId: number, userId: number, payload: unknown): Promise<GroupUserEntity | null> {
        const data = <updateGroupUserPayload>payload;
        return await GroupUserService.updateGroupUser(groupId, userId, data.values);
    }

    static async deleteGroupUser(groupId: number, userId: number): Promise<void> {
        await GroupUserService.deleteGroupUser(groupId, userId);
    }

}