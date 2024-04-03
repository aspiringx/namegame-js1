import "dotenv/config";
import Koa from "koa";
import koaJson from "koa-json";
import koaLogger from "koa-logger";
import bodyParser from "koa-bodyparser";

import { restRoutes } from "@route/rest-routes";
import { graphqlRoute } from "@route/graphql-route";

import { responseFormatHandler } from "@middleware/ResponseFormatHandler";
import { uncaughtErrorHandler } from "@middleware/UncaughtErrorHandler";

import "reflect-metadata";
import { AppDataSource } from "./db/data-source";

AppDataSource.initialize().then(async () => {

    const app = new Koa();

    const port: number = Number(process.env.APP_PORT) || 3000;

    // Allow parsing request body in routes
    app.use(koaJson());
    app.use(koaLogger());
    app.use(bodyParser());

    // Global JSON format
    app.use(responseFormatHandler);

    // Global error handler
    app.use(uncaughtErrorHandler);

    // Routes
    restRoutes(app);
    graphqlRoute(app);

    return app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => console.log(error));
