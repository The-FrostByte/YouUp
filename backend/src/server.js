//const express = require('express');

import express from 'express';
//import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from './lib/db.js';
import { ENV } from "./lib/env.js";

//dotenv.config()

const app = express();
const __dirname = path.resolve(); //Tells you -> where am i now

const PORT = ENV.PORT || 3000;

app.use(express.json()) // to use req.body
app.use(cookieParser()) // for fetching the data from cookie. for example -> jwt token

app.use('/api/auth', authRoutes); /* if request is starting from
/api/auth send it to authRoutes */

app.use('/api/messages', messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => { // _ because we are not using "req" here at all

    /* We can write this in comma seperated as well ->
    (__dirname,"../frontend","dist","index.html") */
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));

  })
}


app.listen(PORT, () => {
  console.log('server running on port: ' + PORT)
  connectDB();
});

