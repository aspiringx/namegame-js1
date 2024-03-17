import { GroupUserService } from "@service/GroupUserService";
import { GroupUser } from '@entity/GroupUser';

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

    static async createGroupUser(groupId: number, payload: unknown): Promise<GroupUser> {
        const data = <createGroupUserPayload>payload;
        return GroupUserService.createGroupUser(groupId, data.values);
    }

    static async updateGroupUser(payload: unknown): Promise<GroupUser | null> {
        const data = <updateGroupUserPayload>payload;
        return await GroupUserService.updateGroupUser(data.id, data.values);
    }

    static async deleteGroupUser(id: number): Promise<void> {
        await GroupUserService.deleteGroupUser(id);
    }

}