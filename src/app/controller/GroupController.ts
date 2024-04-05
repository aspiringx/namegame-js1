import { GroupService } from "@service/GroupService";
import { GroupEntity } from '@entity/GroupEntity';
import { Context } from "koa";

import formatResponse from "@middleware/ApiCallResponseHandler";

interface createGroupPayload {
    values: object
}

interface updateGroupPayload {
    id: number,
    values: object
}

export class GroupController {

    static async getGroup(id: number, ctx: Context) {
        const fnReturn = await GroupService.getGroup(id);

        return formatResponse.findResource(fnReturn, ctx);
    }

    static async getAllGroups(ctx: Context) {
        const fnReturn = await GroupService.getAllGroups();

        return formatResponse.findResource(fnReturn, ctx);
    }

    static async createGroup(payload: unknown, ctx: Context): Promise<Object> {
        const data = <createGroupPayload>payload;
        const fnReturn = await GroupService.createGroup(data.values);

        return formatResponse.createResource(fnReturn, ctx);
    }

    static async updateGroup(groupId: number, payload: unknown, ctx: Context): Promise<Object | null> {
        const data = <updateGroupPayload>payload;
        const fnReturn = await GroupService.updateGroup(groupId, data.values);

        return formatResponse.updateResource(fnReturn, ctx);
    }

    static async deleteGroup(groupId: number, ctx: Context): Promise<Object> {
        const fnReturn = await GroupService.deleteGroup(groupId);

        return formatResponse.deleteResource(fnReturn, ctx);
    }

}