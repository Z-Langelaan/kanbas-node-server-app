import express from 'express'
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://zoe:<zoe123>@cluster0.4rtjpzu.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import session from "express-session";
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
app.use(session(sessionOptions));
  
  
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app)
app.listen(4000)