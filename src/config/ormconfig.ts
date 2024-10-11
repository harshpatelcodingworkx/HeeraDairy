import { DataSource } from "typeorm"
import path from "path";
import 'dotenv/config'
const PORT : number = parseInt(process.env.DB_PORT || "5432");

export const ConnectDB = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname ,"..","entities/*{.ts,.js}")],
    migrations: [path.join(__dirname,'..','migrations/*{.ts,.js}')],
    migrationsTableName:"myMigrations",
});