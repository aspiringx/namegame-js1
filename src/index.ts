import 'dotenv/config';
import Koa from 'koa';
import { setupRoutes } from './routes';

import "reflect-metadata";
import { AppDataSource } from "./data-source";

const app = new Koa();
const port: number = Number(process.env.APP_PORT) || 3000;

AppDataSource.initialize().then(async () => {
  // Routes
  setupRoutes(app);

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log(error));
