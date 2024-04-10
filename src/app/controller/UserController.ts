import { UserService } from "@service/UserService";
import { Context } from "koa";
import Joi from 'joi';

import formatResponse from "@middleware/ApiCallResponseHandler";
import userValidator from "@validator/UserValidator";

import { greetUserPayload, createUserPayload, updateUserPayload } from "../../types/UserTypes";

export class UserController {

    // Sample call (Step 2): Request user name / Return custom message
    // Business logic: Concatenate full name string and message
    // NOTE: No validation or response abstractions (i.e. Simpler setup but cluttered)
    static async greetUser(payload: greetUserPayload, ctx: Context): Promise<Object>{

        const data = <greetUserPayload>payload;

        // Validation schema rules
        const validationSchema = Joi.object({
            email: Joi.string().email().required()
        });

        // Validate request
        const validation = validationSchema.validate({ email: data.email });
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        // Execute request
        const name = await UserService.getUserName(data.email);

        // Create response
        if(name) {
            return {
                message: 'User greeting created.',
                greeting: 'Welcome to the website ' + name + '.'
            }
        } else {
            ctx.status = 404;
            return {
                message: 'No user found to greet.',
                data: null
            }
        }
    }

    // Basic CRUD calls
    // NOTE: Abstracted validation and response (i.e. Cleaner but complex setup)

    /**
     * Retrieves a specific user by their ID.
     * @param id The ID of the user to retrieve.
     * @param ctx The Koa context object.
     * @returns A promise resolving to an object representing the user.
     */
    static async getUser(id: number, ctx: Context): Promise<Object> {

        const validation = userValidator.getUser(id);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await UserService.getUser(id);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    /**
     * Retrieves all users.
     * @param ctx The Koa context object.
     * @returns A promise resolving to a collection of user objects.
     */
    static async getAllUsers(ctx: Context): Promise<Object> {

        const fnReturn = await UserService.getAllUsers();

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }

    /**
     * Creates a new user.
     * @param reqPayload The payload containing user data.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the create operation.
     */
    static async createUser(reqPayload: createUserPayload, ctx: Context): Promise<Object> {

        const validation = userValidator.createUser(reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await UserService.createUser(reqPayload.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    /**
     * Updates an existing user's details.
     * @param userId The ID of the user to update.
     * @param reqPayload The payload containing updated user data.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the update operation.
     */
    static async updateUser(userId: number, reqPayload: updateUserPayload, ctx: Context): Promise<Object> {

        // All update values are optional but return error on empty payload
        ctx.assert(Object.keys(reqPayload.values).length, 422, 'Empty request payload.');

        const validation = userValidator.updateUser(reqPayload);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await UserService.updateUser(userId, reqPayload.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     * @param ctx The Koa context object.
     * @returns A promise resolving to the result of the delete operation.
     */
    static async deleteUser(id: number, ctx: Context): Promise<Object> {

        const validation = userValidator.deleteUser(id);
        ctx.assert(!validation.error?.message, 400, validation.error?.message);

        const fnReturn = await UserService.deleteUser(id);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}