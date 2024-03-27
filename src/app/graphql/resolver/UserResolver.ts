import { UserRepository } from '@repository/UserRepository';

export const userResolver = {

    users: async (parent: any, args: any, context: any, info: any) => {
        const fields = info.fieldNodes[0].selectionSet.selections.map(
            (selection: any) => selection.name.value
        );

        return await UserRepository.find({
            select: fields
        });
    },
};
