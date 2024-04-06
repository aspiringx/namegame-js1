import { GroupUserService } from "@service/GroupUserService";
import { Context } from "koa";

import formatResponse from "@middleware/ApiCallResponseHandler";

interface createGroupUserPayload {
    values: object
}

interface updateGroupUserPayload {
    id: number,
    values: object
}

export class GroupUserController {

    static async getGroupUsers(group_id: number, ctx: Context): Promise<Object> {
        const fnReturn = await GroupUserService.getGroupUsers(group_id);

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }

    static async createGroupUser(groupId: number, payload: unknown, ctx: Context): Promise<Object> {
        const data = <createGroupUserPayload>payload;
        const fnReturn = await GroupUserService.createGroupUser(groupId, data.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    static async updateGroupUser(groupId: number, userId: number, payload: unknown, ctx: Context): Promise<Object | null> {
        const data = <updateGroupUserPayload>payload;
        const fnReturn = await GroupUserService.updateGroupUser(groupId, userId, data.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

    static async deleteGroupUser(groupId: number, userId: number, ctx: Context): Promise<Object> {
        const fnReturn = await GroupUserService.deleteGroupUser(groupId, userId);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}