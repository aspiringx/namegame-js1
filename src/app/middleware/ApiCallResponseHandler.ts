import { Context } from "koa";

/**
 * Utility class for formatting response objects based on TypeORM query return structure.
 *
 * Find functions with single result return single object.
 * Find functions with multiple results return array of objects.
 * Update and delete functions return object with affected row count.
 *
 * NOTE: Success/Fail messages are generic for now.
 */
class responseFormatHandler {

    /**
     * Create response from result collection array or null.
     * @param fnReturn TypeORM query function return.
     * @param ctx The Koa context object.
     * @returns Response object.
     */
    static async fromResultCollection(fnReturn: Array<Object> | null, ctx: Context) {
        const count = fnReturn !== null ? fnReturn.length : 0;

        if(fnReturn !== null) {
            return { message: count + ' resources found.',  data: fnReturn};
        } else {
            ctx.status = 404;
            return { message: 'Resource not found.',  data: null};
        }
    }

    /**
     * Create response from single result object or null.
     * @param fnReturn TypeORM query function return.
     * @param ctx The Koa context object.
     * @returns Response object.
     */
    static async fromSingleResult(fnReturn: Object | null, ctx: Context) {
        if(fnReturn) {
            return { message: 'Resource found.',  data: fnReturn};
        } else {
            ctx.status = 404;
            return { message: 'Resource not found.',  data: null};
        }
    }

    /**
     * Create response from affected row count or null.
     * @param count TypeORM query function return.
     * @param ctx The Koa context object.
     * @returns Response object.
     */
    static async fromResultCount(fnReturn: Object | null, ctx: Context): Promise<Object> {
        let response = {};
        if(fnReturn !== null && 'affected' in fnReturn) {

            response = { message: fnReturn.affected + ' resources affected.', affected: fnReturn.affected };
        } else if(fnReturn === null) {
            ctx.status = 404;
            response = { message: 'Resource operation failed.'};
        }

        return response;
    }
}

export default responseFormatHandler;
