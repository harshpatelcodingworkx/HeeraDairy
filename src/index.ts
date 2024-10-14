import 'reflect-metadata'
import 'dotenv/config'
import express from 'express';
import { ConnectDB } from './config/ormconfig';
import loginRoute from './routes/loginRoute';
import adminRoute from './routes/adminRoute';
import { ErrorRequestHandler, myAppError } from './middlewares/errorHandling';

const app = express();
const PORT : number = parseInt(process.env.PORT || '8000');

app.use(express.json());
//routes
app.use("/api",loginRoute);
app.use("/api",adminRoute);


app.use(ErrorRequestHandler);


ConnectDB.initialize().then(()=>{
    console.log("Database connected");
    app.listen(PORT, () : void=>{
        console.log("Server running at ",PORT);
    });
})
.catch((err : myAppError)=>{
    console.log("Unable to connect database", err);
})