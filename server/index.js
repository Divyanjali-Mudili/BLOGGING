const express=require('express');
const mongoose =require('mongoose');
require('dotenv').config();
const cors=require('cors');
const adminRouter=require("./routes/admins");
const userRouter=require("./routes/user");
const app=express();
app.use(cors());
app.use(express.json());
import rateLimit from 'express-rate-limit';
const loginLimiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many login attempts from this IP,try again later"
  })

app.use("/admin",loginLimiter,adminRouter)
app.use("/user",loginLimiter,userRouter)
app.get("/",(req,res)=> res.json({
    msg: "hello"
}))
const connectToMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, { dbName: "BLOGWEBAPP" });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  };
  connectToMongoDB();
app.listen(3000,()=>console.log('Server running on port 3000'));