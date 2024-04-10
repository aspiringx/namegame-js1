import { GroupUserService } from "@service/GroupUserService";
import { Context } from "koa";

import formatResponse from "@middleware/ApiCallResponseHandler";
import groupUserValidator from "@validator/GroupUserValidator";

import { createGroupUserPayload, updateGroupUserPayload } from "../../types/GroupUserTypes";

export class GroupUserController {

    static async getGroupUsers(groupId: number, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.getGroupUsers(groupId);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.getGroupUsers(groupId);

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }

    static async createGroupUser(groupId: number, reqPayload: createGroupUserPayload, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.createGroupUser(groupId, reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.createGroupUser(groupId, reqPayload.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    static async updateGroupUser(groupId: number, userId: number, reqPayload: updateGroupUserPayload, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.updateGroupUser(groupId, userId, reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.updateGroupUser(groupId, userId, reqPayload.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

    static async deleteGroupUser(groupId: number, userId: number, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.deleteGroupUser(groupId);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.deleteGroupUser(groupId, userId);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}