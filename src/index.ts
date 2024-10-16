import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import { mongoConnectionUrl } from "./config/dbConnect";
import adminRoute from "./routes/adminRoute";
import { ErrorRequestHandler } from "./middlewares/errorHandler";


const PORT: number = process.env.PORT ? Number(process.env.PORT) : 8000;
const app = express();  

//route
app.use("/api",adminRoute);


app.use(ErrorRequestHandler);

mongoose.connect(mongoConnectionUrl)
.then(()=>{
    console.log("Database Connected");
    app.listen(PORT, () => {
        console.log("Server running at ", PORT);
    })
})
.catch((err)=>{
    console.log("Err DB ", err);
})