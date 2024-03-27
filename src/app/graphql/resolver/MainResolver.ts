import { userResolver } from "@resolver/UserResolver";
import { groupResolver } from "@resolver/GroupResolver";

export const resolvers = {
    Query: {
        ...userResolver,
        ...groupResolver
    },
};
