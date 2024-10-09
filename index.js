const express = require("express");
const adminRoute = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const { errorhandler } = require("./middleware/handleError");


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// routes
app.use("/api", loginRoute);
app.use("/api",adminRoute);

app.use(errorhandler);
app.listen(PORT , ()=>{
    console.log("Server running at ",PORT);
});