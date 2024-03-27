import { GraphQLSchema, GraphQLObjectType, GraphQLList } from "graphql";
import { resolvers } from "@resolver/MainResolver";
import { UserType } from "@schema/UserType";
import { GroupType } from "@schema/GroupType";

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => resolvers.Query.users
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve: () => resolvers.Query.groups
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType
});

export default schema;
