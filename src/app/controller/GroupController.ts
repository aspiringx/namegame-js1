import { GroupService } from "@service/GroupService";
import { Group } from '@entity/Group';

interface createGroupPayload {
    values: object
}

interface updateGroupPayload {
    id: number,
    values: object
}

export class GroupController {

    static async getGroup(id: number) {
        return GroupService.getGroup(id);
    }

    static async getAllGroups() {
        return GroupService.getAllGroups();
    }

    static async createGroup(payload: unknown): Promise<Group> {
        const data = <createGroupPayload>payload;
        return GroupService.createGroup(data.values);
    }

    static async updateGroup(groupId: number, payload: unknown): Promise<Group | null> {
        const data = <updateGroupPayload>payload;
        return await GroupService.updateGroup(groupId, data.values);
    }

    static async deleteGroup(groupId: number): Promise<void> {
        await GroupService.deleteGroup(groupId);
    }

}