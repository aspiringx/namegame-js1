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

// START FROM HERE, THE SERVER CAN START NOW AND IS USING KOA
// NEED TO SORT OUT TYPEORM AND ORGANIZE THE CODE BETTER <------

// AppDataSource.initialize().then(async () => {

//   console.log("Inserting a new user into the database...")
//   const user = new User()
//   user.firstName = "Timber"
//   user.lastName = "Saw"
//   user.age = 25
//   await AppDataSource.manager.save(user)
//   console.log("Saved a new user with id: " + user.id)

//   console.log("Loading users from the database...")
//   const users = await AppDataSource.manager.find(User)
//   console.log("Loaded users: ", users)

//   console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
