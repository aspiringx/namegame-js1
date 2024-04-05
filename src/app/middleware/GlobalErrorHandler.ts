import { Context, Next } from "koa";

export async function globalErrorHandler(ctx: Context, next: Next) {
    try {
        await next();

        if(ctx.response.status === 404) {
            ctx.status = 404;
        }
    } catch (err: any) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            // Returning abstract SQL errors to avoid exposing schema structure
            message: 'sql' in err ? 'SQL ERRNO ' + '[' + err.errno + ']: ' + err.code : err.message
        };

        if(process.env.NODE_ENV === 'dev') {
            console.log(err);
        }
    }
}
