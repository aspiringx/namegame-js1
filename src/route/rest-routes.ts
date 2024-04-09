import Router from "@koa/router";
import Koa, { Context, Next } from "koa";

import { UserController } from '@controller/UserController';
import { GroupController } from '@controller/GroupController';
import { GroupUserController } from '@controller/GroupUserController';

import { greetUserPayload, createUserPayload, updateUserPayload } from "../types/UserTypes";
import { createGroupPayload, updateGroupPayload } from "../types/GroupTypes";

export function restRoutes(app: Koa): void {
    const router = new Router();

    // Sample Call (Step 1): POST call to Controller
    // App flow demo: Router -> Controller -> Service -> Repository -> Entity
    router.post('/user/greet', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.greetUser(ctx.request.body as greetUserPayload, ctx);
    });

    /* --- User routes --- */

    router.get('/user/:id', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.getUser(ctx.params.id, ctx);
    });
    router.get('/users', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.getAllUsers(ctx);
    });
    router.post('/user/create', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.createUser(ctx.request.body as createUserPayload, ctx);
    });
    router.put('/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.updateUser(ctx.params.userId, ctx.request.body as updateUserPayload, ctx);
    });
    router.delete('/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await UserController.deleteUser(ctx.params.userId, ctx);
    });

    /* --- Group routes --- */

    router.get('/group/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.getGroup(ctx.params.groupId, ctx);
    });
    router.get('/groups', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.getAllGroups(ctx);
    });
    router.post('/group/create', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.createGroup(ctx.request.body as createGroupPayload, ctx);
    });
    router.put('/group/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.updateGroup(ctx.params.groupId, ctx.request.body as updateGroupPayload, ctx);
    });
    router.delete('/group/:groupId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupController.deleteGroup(ctx.params.groupId, ctx);
    });

    /* --- Group users routes --- */

    router.get('/group/:groupId/users', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.getGroupUsers(parseInt(ctx.params.groupId), ctx);
    });
    router.post('/group/:groupId/user', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.createGroupUser(ctx.params.groupId, ctx.request.body, ctx);
    });
    router.put('/group/:groupId/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.updateGroupUser(parseInt(ctx.params.groupId), parseInt(ctx.params.userId), ctx.request.body, ctx);
    });
    router.delete('/group/:groupId/user/:userId', async (ctx: Context, next: Next) => {
        return ctx.body = await GroupUserController.deleteGroupUser(ctx.params.groupId, ctx.params.userId, ctx);
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

}
