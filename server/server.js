const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { cloudinary_config } = require("./config/cloudinary");
const app = express();

// Application Imports
const connectDB = require("./config/db");

//Config file
dotenv.config({ path: "./config/config.env" });

// Config Cloudinary
cloudinary_config();

// Connect to Database
connectDB();

// Body Parser
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json({ limit: "50mb" }));

// Cors
app.use(cors());

// Morgan for Logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use("/user", require("./routes/user"));
app.use("/user/friend", require("./routes/follow"));
// Port
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
