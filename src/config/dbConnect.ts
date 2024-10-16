const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;
const mongoUrl = process.env.MONGO_URL;
const mongoDbName = process.env.MONGO_DB_NAME;


export const mongoConnectionUrl = `mongodb+srv://${username}:${password}@${mongoUrl}/${mongoDbName}`