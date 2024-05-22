import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser"

const app = express()
dotenv.config();

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
            .then(() => {
                console.log('Connected to DB')
            })
            .catch((err) => {
                throw err
            })
}
const uri = "mongodb+srv://jianfeizhu2516:wDvb6IpDdAu9l5jN@cluster0.ysj3k99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "there is something wrong"
    return res.status(status).json({
        succes:false,
        status,
        message
    })
})
app.listen(8800, () => {
    connect();
    console.log("connected to server!")
})