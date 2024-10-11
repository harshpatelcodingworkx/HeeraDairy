import 'reflect-metadata'
import 'dotenv/config'
import express from 'express';
import { ConnectDB } from './config/ormconfig';
import loginRoute from './routes/loginRoute';

const app = express();
const PORT : number = parseInt(process.env.PORT || '8000');

//routes
app.use("/api",loginRoute);



ConnectDB.initialize().then(()=>{
    console.log("Database connected");
    app.listen(PORT, () : void=>{
        console.log("Server running at ",PORT);
    });
})
.catch((err : Error)=>{
    console.log("Unable to connect database", err);
})