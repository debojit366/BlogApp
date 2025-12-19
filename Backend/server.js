import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.config.js";


connectDB();


const app = express();


app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server Running on port number ${PORT}`);
});