import Router from "@koa/router";
import Koa, { Context, Next } from "koa";

import { ApolloServer } from "@apollo/server";
import { koaMiddleware } from "@as-integrations/koa";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  }
}

export async function graphqlRoute(app: Koa): Promise<void> {

  const router = new Router();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  const handleGraphQLRequest = async (ctx: Context, next: Next) => {
    // Define the context function to extract the token from the request headers
    const createContext = async ({ ctx }: { ctx: Context }) => ({ token: ctx.headers.token });
  
    // Invoke koaMiddleware with server and options
    const graphqlMiddleware = koaMiddleware(server, { context: createContext });
  
    // Invoke the graphqlMiddleware with ctx and next
    await graphqlMiddleware(ctx, next);
  };

  // GraphQL exclusive endpoint
  router.all('/graphql', handleGraphQLRequest);

  app.use(router.routes());
  app.use(router.allowedMethods());
}
