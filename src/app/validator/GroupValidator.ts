import Joi from "joi";

import { createGroupPayload, updateGroupPayload } from "../../types/GroupTypes";

class GroupValidator {

    private static schemaRules = {
        getGroup: Joi.object({
            id: Joi.number().integer().min(1).required()
        }),
        createGroup: Joi.object({
            parent_id: Joi.number().integer().min(1),
            name: Joi.string().max(100),
            name_full: Joi.string().max(100).required(),
            slug: Joi.string().max(100).required(),
            description: Joi.string(),
            logo_url: Joi.string().uri()
        }),
        updateGroup: Joi.object({
            parent_id: Joi.number().integer().min(1),
            name: Joi.string().max(100),
            name_full: Joi.string().max(100),
            slug: Joi.string().max(100),
            description: Joi.string(),
            logo_url: Joi.string().uri()
        }),
        deleteGroup: Joi.object({
            id: Joi.number().integer().min(1).required()
        }),
    };

    static getGroup(id: number) {
        return this.schemaRules.getGroup.validate({ id: id });
    }

    static createGroup(payload: createGroupPayload) {
        const values = payload.values;

        return this.schemaRules.createGroup.validate({
            parent_id: values.parent_id,
            name: values.name,
            name_full: values.name_full,
            slug: values.slug,
            description: values.description,
            logo_url: values.logo_url,
            is_active: values.is_active,
        }, { abortEarly: false });
    }

    static updateGroup(payload: updateGroupPayload) {
        const values = payload.values;

        return this.schemaRules.updateGroup.validate({
            parent_id: values.parent_id,
            name: values.name,
            name_full: values.name_full,
            slug: values.slug,
            description: values.description,
            logo_url: values.logo_url,
            is_active: values.is_active,
        }, { abortEarly: false });
    }

    static deleteGroup(id: number) {
        return this.schemaRules.deleteGroup.validate({ id: id });
    }

}

export default GroupValidator;
