import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  })
);

app.use(express.static("public"));

app.use(cookieParser());



//routes import 

import userRouter from './routes/user.routes.js'

//routes declaration
//http://localhost:8000/api/v1/users/register
//here "/api/v1" path is command production rule for routing.
app.use("/api/v1/users",userRouter)

export { app };

