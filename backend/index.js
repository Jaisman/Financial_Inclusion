import express from "express";
import { connectMongoDB } from "./connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:true,
    credentials:true
}));

connectMongoDB("mongodb+srv://jaismanjhinger:financial_inclusion@cluster0.icaoavz.mongodb.net/")
.then(()=>console.log("MongoDB connected"));

app.use(cookieParser());
app.use("/user",userRoute);

app.listen(PORT,()=>{
    console.log("Running on port 8000");
})