const cookieParser = require("cookie-parser");
const express=require("express");
const errorMiddleware=require('./middleware/error');
const authorizeUser = require("./middleware/authorizeUser");

const app=express();

app.use(express.json());
app.use(cookieParser());

// Route imports
const userRoute = require("./Routes/userRoutes");

app.use(authorizeUser);
app.use('/api/v1',userRoute);

// Midddleware for error
app.use(errorMiddleware);

module.exports=app;