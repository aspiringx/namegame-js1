import 'dotenv/config';
import Koa from 'koa';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import { setupRoutes } from './route/routes';

import "reflect-metadata";
import { AppDataSource } from "./db/data-source";

const app = new Koa();

const port: number = Number(process.env.APP_PORT) || 3000;

AppDataSource.initialize().then(async () => {

  // Allow parsing request body in routes
  app.use(koaJson());
  app.use(koaLogger());
  app.use(bodyParser());

  // Routes
  setupRoutes(app);

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log(error));
