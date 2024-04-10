import Joi from "joi";

import { createGroupUserPayload, updateGroupUserPayload } from "../../types/GroupUserTypes";

class GroupUserValidator {

    private static schemaRules = {
        getGroupUsers: Joi.object({
            id: Joi.number().integer().min(1).required()
        }),
        createGroupUser: Joi.object({
            user_id: Joi.number().integer().min(1).required(),
            group_id: Joi.number().integer().min(1).required(),
            role: Joi.string().max(100),
            title: Joi.string().max(100),
            is_leader: Joi.boolean(),
            is_active: Joi.boolean(),
        }),
        updateGroupUser: Joi.object({
            user_id: Joi.number().integer().min(1).required(),
            group_id: Joi.number().integer().min(1).required(),
            role: Joi.string().max(100),
            title: Joi.string().max(100),
            is_leader: Joi.boolean(),
            is_active: Joi.boolean(),
        }),
        deleteGroupUser: Joi.object({
            id: Joi.number().integer().min(1).required()
        }),
    };

    static getGroupUsers(id: number) {
        return this.schemaRules.getGroupUsers.validate({ id: id });
    }

    static createGroupUser(groupId: number, payload: createGroupUserPayload) {
        const values = payload.values;

        return this.schemaRules.createGroupUser.validate({
            group_id: groupId, // Param value
            user_id: values.user_id,
            role: values.role,
            title: values.title,
            is_leader: values.is_leader,
            is_active: values.is_active
        }, { abortEarly: false });
    }

    static updateGroupUser(groupId: number, userId: number, payload: updateGroupUserPayload) {
        const values = payload.values;

        return this.schemaRules.updateGroupUser.validate({
            user_id: groupId, // Param value
            group_id: userId, // Param value
            role: values.role,
            title: values.title,
            is_leader: values.is_leader,
            is_active: values.is_active
        }, { abortEarly: false });
    }

    static deleteGroupUser(id: number) {
        return this.schemaRules.deleteGroupUser.validate({ id: id });
    }

}

export default GroupUserValidator;
