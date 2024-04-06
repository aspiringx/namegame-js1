import { Context, Next } from "koa";

// Move response body to data key and add http metadata to top level
export async function responseFormatHandler(ctx: Context, next: Next) {
    await next();

    if(ctx.path !== '/graphql') {
        return ctx.body = {
            http: ctx.status,
            status: ctx.status < 399 ? 'success' : 'error',
            data: ctx.body,
        };
    }
}
