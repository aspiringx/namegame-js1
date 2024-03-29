import { userResolver } from "@resolver/UserResolver";
import { groupResolver } from "@resolver/GroupResolver";

// Main resolver hub
export const resolvers = {
    Query: {
        ...userResolver,
        ...groupResolver
    },
};
