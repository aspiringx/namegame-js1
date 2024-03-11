import Router from "@koa/router";
import Koa, { Context, Next } from "koa";

export function setupRoutes(app: Koa): void {
    const router = new Router();

    router.get("/", async (ctx: Context, next: Next) => {
        ctx.body = "Hello Homepage";
    });

    router.get("/product", async (ctx: Context, next: Next) => {
        ctx.body = "Hello Product Page";
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}

