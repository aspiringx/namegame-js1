import { GroupService } from "@service/GroupService";
import { Context } from "koa";

import formatResponse from "@middleware/ApiCallResponseHandler";
import groupValidator from "@validator/GroupValidator";

import { createGroupPayload, updateGroupPayload } from "../../types/GroupTypes";

export class GroupController {

    static async getGroup(id: number, ctx: Context): Promise<Object> {

        const validation = groupValidator.getGroup(id);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.getGroup(id);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }


    static async getAllGroups(ctx: Context): Promise<Object> {

        const fnReturn = await GroupService.getAllGroups();

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }


    static async createGroup(reqPayload: createGroupPayload, ctx: Context): Promise<Object> {

        const validation = groupValidator.createGroup(reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.createGroup(reqPayload.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }


    static async updateGroup(groupId: number, reqPayload: updateGroupPayload, ctx: Context): Promise<Object> {

        const validation = groupValidator.updateGroup(reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.updateGroup(groupId, reqPayload.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }


    static async deleteGroup(groupId: number, ctx: Context): Promise<Object> {

        const validation = groupValidator.deleteGroup(groupId);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.deleteGroup(groupId);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}
