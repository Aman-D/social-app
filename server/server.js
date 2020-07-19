const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// Application Imports
const connectDB = require("./config/db");

//Config file
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Morgan for Logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
