import Router from "@koa/router";
import Koa, { Context, Next } from "koa";

import { UserController } from '@controller/UserController';
import { GroupController } from '@controller/GroupController';

export function setupRoutes(app: Koa): void {
    const router = new Router();

    // Sample Call (Step 1): POST call to Controller
    // App flow demo: Router -> Controller -> Service -> Repository -> Entity
    router.post('/users/greet', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.greetUser(ctx.request.body);
    });

    /* User routes */

    // Get user by id
    router.get('/users/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.getUser(ctx.params.userId);
    });

    // Get all users
    router.get('/users', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.getAllUsers();
    });

    // Create user
    router.post('/users/create', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.createUser(ctx.request.body);
    });

    // Update user
    router.put('/users/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.updateUser(ctx.params.userId, ctx.request.body);
    });

    // Delete user
    router.delete('/users/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.deleteUser(ctx.params.userId);
    });

    /* Group routes */

    // Get group by id
    router.get('/groups/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.getGroup(ctx.params.groupId);
    });

    // Get all groups
    router.get('/groups', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.getAllGroups();
    });

    // Create group
    router.post('/groups/create', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.createGroup(ctx.request.body);
    });

    // Update group
    router.put('/groups/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.updateGroup(ctx.params.groupId, ctx.request.body);
    });

    // Delete group
    router.delete('/groups/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.deleteGroup(ctx.params.groupId);
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

}
