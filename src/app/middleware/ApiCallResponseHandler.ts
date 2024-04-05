import { Context, Next } from "koa";

/**
 * Utility class for formatting response objects.
 * Middleware taps into http call's context and update status and responses.
 */
class responseFormatHandler {
    private static messages = {fail: '', success: ''};

    /**
     * Formats response object based on whether fnReturn payload exists or is null.
     * @param fnReturn The object returned by a function.
     * @param ctx The Koa context object.
     * @returns Formatted response object.
     */
    static async fromExists(fnReturn: Object | null, ctx: Context): Promise<Object> {

        if(fnReturn) {
            return { message: this.messages.success,  data: fnReturn};
        } else {
            ctx.status = 404;
            return { message: this.messages.fail,  data: null};
        }
    }

    /**
     * Formats response object based on whether fnReturn returns a count of affected rows or null.
     * @param count The number of rows affected or null.
     * @param ctx The Koa context object.
     * @returns Formatted response object.
     */
    static async fromCount(count: number | null, ctx: Context): Promise<Object> {
        if(count == null) {
            ctx.status = 404;
            return { message: this.messages.fail};
        }

        if(count) {
            return { message: this.messages.success};
        } else {
            ctx.status = 404;
            return { message: this.messages.fail};
        }
    }

    /**
     * Formats response object for find operation.
     * @param fnReturn The object returned by an update function.
     * @param ctx The Koa context object.
     * @returns Formatted response object.
     */
    static async findResource(fnReturn: Object | null, ctx: Context): Promise<Object> {
        this.messages = {
            success: 'Resource found.',
            fail: 'Resource not found.'
        }

        return this.fromExists(fnReturn, ctx)
    }

    /**
     * Formats response object for create operation.
     * @param fnReturn The object returned by an update function.
     * @param ctx The Koa context object.
     * @returns Formatted response object.
     */
    static async createResource(fnReturn: Object | null, ctx: Context): Promise<Object> {
        this.messages = {
            success: 'Resource creation successful.',
            fail: 'Resource creation failed.'
        }

        return this.fromExists(fnReturn, ctx)
    }

    /**
     * Formats response object for update operation.
     * @param fnReturn The object returned by an update function.
     * @param ctx The Koa context object.
     * @returns Formatted response object.
     */
    static async updateResource(fnReturn: Object | null, ctx: Context): Promise<Object> {
        this.messages = {
            success: 'Resource update successful.',
            fail: 'Resource update failed.'
        }

        return this.fromExists(fnReturn, ctx)
    }

    /**
     * Formats response object for cancel operation.
     * @param fnReturn The object returned by an update function.
     * @param ctx The Koa context object.
     * @returns Formatted response object.
     */
    static async deleteResource(fnReturn: Object, ctx: Context): Promise<Object>{
        let count: number | null = null;

        if('affected' in fnReturn) {
            count = fnReturn.affected as number | null;
        }
        // count = null;
        this.messages = {
            success: 'Resource deletion successful.',
            fail: count === null ? 'Resource deletion failed.' : 'No resource found to delete.'
        }

        return this.fromCount(count, ctx);
    }

}

export default responseFormatHandler;
