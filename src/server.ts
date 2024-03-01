import Koa from "koa";

const app: Koa = new Koa();
const port: number = 3000;

app.use(async (ctx: Koa.Context) => {
  ctx.body = 'Hello World';
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});