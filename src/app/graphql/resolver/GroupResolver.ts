import { GroupRepository } from "@repository/GroupRepository";

export const groupResolver = {

    groups: async (parent: any, args: any, context: any, info: any) => {
        const fields = info.fieldNodes[0].selectionSet.selections.map(
            (selection: any) => selection.name.value
        );

        return await GroupRepository.find({
            select: fields
        });
    },
};
