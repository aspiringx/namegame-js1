import Koa from 'koa';
import Router from '@koa/router';
import 'dotenv/config';
import "reflect-metadata";

import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(() => {
  const port: number = +process.env.APP_PORT || 3000;
  const app = new Koa();
  const router: Router = new Router();

  // Routes
  router.get('/', (ctx: Koa.Context) => {ctx.body = 'Hello Test'});

  // Router Middleware
  app.use(router.routes()).use(router.allowedMethods());

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });
})

