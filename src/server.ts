import Koa from 'koa';
import Router from '@koa/router';
import 'dotenv/config';

const app: Koa = new Koa();
const router: Router = new Router();
const port: number = 3000;

router.get('/', (ctx: Koa.Context) => {ctx.body = 'Hello Test'});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
