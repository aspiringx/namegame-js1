import 'dotenv/config';
import { DataSource } from "typeorm";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = process.env.MYSQL_HOST;
const port = Number(process.env.MYSQL_PORT) || 3306;
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
    logging: false,
    entities: [`${__dirname}/../../**/entity/*.{ts,js}`],
    migrations: [`${__dirname}/**/migration/*.{ts,js}`],
    subscribers: [],
    synchronize: true // TODO - Conditionally turn off for production
})
