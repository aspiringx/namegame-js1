import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from "graphql";

export const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
        parent_id: { type: GraphQLInt },
        name: { type: GraphQLString },
        name_full: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        logo_url: { type: GraphQLString },
        is_active: { type: GraphQLBoolean }
    })
});