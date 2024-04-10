import { GroupService } from "@service/GroupService";
import { Context } from "koa";

import formatResponse from "@middleware/ApiCallResponseHandler";
import groupValidator from "@validator/GroupValidator";

import { createGroupPayload, updateGroupPayload } from "../../types/GroupTypes";

export class GroupController {

    /**
     * Retrieves a specific group by its ID.
     * @param id The ID of the group to retrieve.
     * @param ctx The Koa context object.
     * @returns A promise resolving to an object representing the group.
     */
    static async getGroup(id: number, ctx: Context): Promise<Object> {

        const validation = groupValidator.getGroup(id);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.getGroup(id);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    /**
     * Retrieves all groups.
     * @param ctx The Koa context object.
     * @returns A promise resolving to a collection of group objects.
     */
    static async getAllGroups(ctx: Context): Promise<Object> {

        const fnReturn = await GroupService.getAllGroups();

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }

    /**
     * Creates a new group.
     * @param reqPayload The payload containing group data.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the create operation.
     */
    static async createGroup(reqPayload: createGroupPayload, ctx: Context): Promise<Object> {

        const validation = groupValidator.createGroup(reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.createGroup(reqPayload.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    /**
     * Updates an existing group's details.
     * @param groupId The ID of the group to update.
     * @param reqPayload The payload containing updated group data.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the update operation.
     */
    static async updateGroup(groupId: number, reqPayload: updateGroupPayload, ctx: Context): Promise<Object> {

        // All update values are optional but return error on empty payload
        ctx.assert(Object.keys(reqPayload.values).length, 422, 'Empty request payload.');

        const validation = groupValidator.updateGroup(reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.updateGroup(groupId, reqPayload.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

    /**
     * Deletes a group by its ID.
     * @param groupId The ID of the group to delete.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the delete operation.
     */
    static async deleteGroup(groupId: number, ctx: Context): Promise<Object> {

        const validation = groupValidator.deleteGroup(groupId);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupService.deleteGroup(groupId);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}
