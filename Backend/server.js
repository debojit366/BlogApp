import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.config.js";
import userRoute from "./route/userRoute.js";
import blogRoute from './route/blogRoutes.js'
connectDB();


const app = express();


app.use(cors());
app.use(express.json());
app.use(urlencoded({extended : true}))
app.use('/api/v1/user',userRoute)
app.use('/api/v1/blog',blogRoute)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server Running on port number ${PORT}`);
});