import { Context, Next } from "koa";

export async function responseFormatHandler(ctx: Context, next: Next) {
    await next();

    return ctx.body = {
        http: ctx.status,
        message: ctx.message,
        payload: ctx.body,
    };
}
