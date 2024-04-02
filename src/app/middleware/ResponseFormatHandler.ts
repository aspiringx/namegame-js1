import { Context, Next } from "koa";

export async function responseFormatHandler(ctx: Context, next: Next) {
    await next();

    if(ctx.path !== '/graphql') {
        return ctx.body = {
            http: ctx.status,
            status: ctx.message,
            data: ctx.body,
        };
    }
}
