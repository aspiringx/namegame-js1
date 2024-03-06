import 'dotenv/config';
import { DataSource } from "typeorm";

const host = process.env.MYSQL_HOST;
const port = +process.env.MYSQL_PORT || 3306;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    subscribers: [],
})
