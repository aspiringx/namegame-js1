import { Context, Next } from "koa";

export async function uncaughtErrorHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (err: any) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: 'sql' in err ? err.code : err.message
        };

        if(process.env.NODE_ENV === 'dev') {
            console.log(err);
        }
    }
}
