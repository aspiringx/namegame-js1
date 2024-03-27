import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        photo_url: { type: GraphQLString },
        mobile_phone: { type: GraphQLString },
        mobile_phone_carrier: { type: GraphQLString }
    })
});