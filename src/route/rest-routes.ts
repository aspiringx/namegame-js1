import Router from "@koa/router";
import Koa, { Context, Next } from "koa";

import { UserController } from '@controller/UserController';
import { GroupController } from '@controller/GroupController';
import { GroupUserController } from '@controller/GroupUserController';

export function restRoutes(app: Koa): void {
    const router = new Router();

    // Sample Call (Step 1): POST call to Controller
    // App flow demo: Router -> Controller -> Service -> Repository -> Entity
    router.post('/user/greet', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.greetUser(ctx.request.body, ctx);
    });

    /* --- User routes --- */

    // Get user by id
    router.get('/user/:id', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.getUser(ctx.params.id, ctx);
    });

    // Get all users
    router.get('/users', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.getAllUsers(ctx);
    });

    // Create user
    router.post('/user/create', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.createUser(ctx.request.body, ctx);
    });

    // Update user
    router.put('/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.updateUser(ctx.params.userId, ctx.request.body, ctx);
    });

    // Delete user
    router.delete('/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.deleteUser(ctx.params.userId, ctx);
    });

    /* --- Group routes --- */

    // Get group by id
    router.get('/group/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.getGroup(ctx.params.groupId);
    });

    // Get all groups
    router.get('/groups', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.getAllGroups();
    });

    // Create group
    router.post('/group/create', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.createGroup(ctx.request.body);
    });

    // Update group
    router.put('/group/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.updateGroup(ctx.params.groupId, ctx.request.body);
    });

    // Delete group
    router.delete('/group/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.deleteGroup(ctx.params.groupId);
    });

    /* --- Group users routes --- */

    // Get users in group by group id
    router.get('/group/:groupId/users', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.getGroupUsers(parseInt(ctx.params.groupId));
    });

    // Add user to group
    router.post('/group/:groupId/user', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.createGroupUser(ctx.params.groupId, ctx.request.body);
    });

    // Update user in group
    router.put('/group/:groupId/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.updateGroupUser(parseInt(ctx.params.groupId), parseInt(ctx.params.userId), ctx.request.body);
    });

    // Delete user in group
    router.delete('/group/:groupId/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.deleteGroupUser(ctx.params.groupId, ctx.params.userId);
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

}
