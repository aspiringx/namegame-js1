"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("@koa/router");
require("dotenv/config");
const app = new Koa();
const router = new Router();
const port = 3000;
router.get('/', (ctx) => { ctx.body = 'Hello Test'; });
// Router Middleware
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map