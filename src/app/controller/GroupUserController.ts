import { GroupUserService } from "@service/GroupUserService";
import { Context } from "koa";

import formatResponse from "@middleware/ApiCallResponseHandler";
import groupUserValidator from "@validator/GroupUserValidator";

import { createGroupUserPayload, updateGroupUserPayload } from "../../types/GroupUserTypes";

export class GroupUserController {

    /**
     * Retrieves all users belonging to a specified group.
     * @param groupId The ID of the group.
     * @param ctx The Koa context object.
     * @returns A promise resolving to an object representing the group users.
     */
    static async getGroupUsers(groupId: number, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.getGroupUsers(groupId);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.getGroupUsers(groupId);

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }

    /**
     * Creates a new user and associates it with the specified group.
     * @param groupId The ID of the group.
     * @param reqPayload The payload containing user data.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the create operation.
     */
    static async createGroupUser(groupId: number, reqPayload: createGroupUserPayload, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.createGroupUser(groupId, reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.createGroupUser(groupId, reqPayload.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    /**
     * Updates an existing group user's details.
     * @param groupId The ID of the group.
     * @param userId The ID of the user within the group.
     * @param reqPayload The payload containing updated user data.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the update operation.
     */
    static async updateGroupUser(groupId: number, userId: number, reqPayload: updateGroupUserPayload, ctx: Context): Promise<Object> {

        // All update values are optional but return error on empty payload
        ctx.assert(Object.keys(reqPayload.values).length, 422, 'Empty request payload.');

        const validation = groupUserValidator.updateGroupUser(groupId, userId, reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.updateGroupUser(groupId, userId, reqPayload.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

    /**
     * Deletes a user from the specified group.
     * @param groupId The ID of the group.
     * @param userId The ID of the user to be deleted.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the delete operation.
     */
    static async deleteGroupUser(groupId: number, userId: number, ctx: Context): Promise<Object> {

        const validation = groupUserValidator.deleteGroupUser(groupId);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await GroupUserService.deleteGroupUser(groupId, userId);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}
