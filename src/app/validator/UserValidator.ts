import Joi from "joi";

import { createUserPayload, updateUserPayload } from "../../types/UserTypes";

class UserValidator {

    private static schemaRules = {
        getUser: Joi.object({
            id: Joi.number().integer().min(1).required()
        }),
        createUser: Joi.object({
            first_name: Joi.string().max(100).required(),
            last_name: Joi.string().max(100).required(),
            email: Joi.string().email().required(),
            photo_url: Joi.string().uri(),
            mobile_phone: Joi.string()
        }),
        updateUser: Joi.object({
            first_name: Joi.string().max(100),
            last_name: Joi.string().max(100),
            email: Joi.string().email(),
            photo_url: Joi.string().uri(),
            mobile_phone: Joi.string()
        }),
        deleteUser: Joi.object({
            id: Joi.number().integer().min(1).required()
        }),
    };

    static getUser(id: number) {
        return this.schemaRules.getUser.validate({ id: id });
    }

    static createUser(payload: createUserPayload) {
        const values = payload.values;

        return this.schemaRules.createUser.validate({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            photo_url: values.photo_url,
            mobile_phone: values.mobile_phone
        }, { abortEarly: false });
    }

    static updateUser(payload: updateUserPayload) {
        const values = payload.values;

        return this.schemaRules.updateUser.validate({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            photo_url: values.photo_url,
            mobile_phone: values.mobile_phone
        }, { abortEarly: false });
    }

    static deleteUser(id: number) {
        return this.schemaRules.deleteUser.validate({ id: id });
    }

}

export default UserValidator;
