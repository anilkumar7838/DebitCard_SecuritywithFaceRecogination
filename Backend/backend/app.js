const express=require("express");
const errorMiddleware=require('./middleware/error');
const cors = require('cors')

const app=express();
app.use(cors());
app.use(express.json());

// Route imports
const userRoute = require("./Routes/userRoutes");

app.use('/api/v1',userRoute);

// Midddleware for error
app.use(errorMiddleware);

module.exports=app;