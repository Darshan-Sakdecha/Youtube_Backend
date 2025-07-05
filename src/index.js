// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

// 2nd approach to db connect
connectDB();

// 1st approach to db connect
/*
import express from "express"
const app = express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error: ",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listing on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("ERROR: ",error)
        throw err
    }
})()

*/
