import { UserService } from "@service/UserService";
import { Context } from "koa";

import Joi from "joi";

import formatResponse from "@middleware/ApiCallResponseHandler";

interface greetUserPayload {
    email: string
}

interface createUserPayload {
    values: object
}

interface updateUserPayload {
    id: number,
    values: object
}

const userValidationRules = {
    greetUser: Joi.object({
        email: Joi.string().email().required()
    }),
    getUser: Joi.object({
        Id: Joi.number().integer().min(1).required()
    }),
    createUser: Joi.object({
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        photo_url: Joi.string().uri(),
        mobile_phone: Joi.string()
    }),
    updateUser: Joi.object({
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
        email: Joi.string().forbidden(),
        photo_url: Joi.string().uri(),
        mobile_phone: Joi.string()
    }),
    deleteUser: Joi.object({
        id: Joi.number().integer().min(1).required()
    }),
};

export class UserController {

    // Sample call (Step 2): Request user name / Return custom message
    // Business logic: Concatenate full name string and message
    // NOTE: Example of custom responses
    static async greetUser(payload: unknown, ctx: Context): Promise<any>{
        const data = <greetUserPayload>payload;
        const name = await UserService.getUserName(data.email);

        // Validate call data
        const validation = userValidationRules.greetUser.validate({ email: data.email }, { abortEarly: false });

        if('error' in validation && validation.error?.message) {
            ctx.throw(400, validation.error.message);
        }

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

    // Basic calls
    // NOTE: Example of auto generated responses using a ApiCallResponseHandler middleware

    static async getUser(id: number, ctx: Context): Promise<Object> {
        const fnReturn = await UserService.getUser(id);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    static async getAllUsers(ctx: Context): Promise<Object> {
        const fnReturn = await UserService.getAllUsers();

        return formatResponse.fromResultCollection(fnReturn, ctx);
    }

    static async createUser(reqPayload: unknown, ctx: Context): Promise<Object> {
        const data = <createUserPayload>reqPayload;
        const fnReturn = await UserService.createUser(data.values);

        return formatResponse.fromSingleResult(fnReturn, ctx);
    }

    static async updateUser(userId: number, reqPayload: unknown, ctx: Context): Promise<Object> {
        const data = <updateUserPayload>reqPayload;
        const fnReturn = await UserService.updateUser(userId, data.values);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

    static async deleteUser(userId: number, ctx: Context): Promise<Object> {
        const fnReturn = await UserService.deleteUser(userId);

        return formatResponse.fromResultCount(fnReturn, ctx);
    }

}