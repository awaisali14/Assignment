const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const userRoute = require("./route/userRoutes");
const postRoute = require("./route/postRoutes");
// const authRoute = require("./route/authRoutes");

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);

module.exports = app;
