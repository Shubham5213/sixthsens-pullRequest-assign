const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes.js");
const pullRequestRoutes = require("./routes/pullRequestRoutes.js");
dotenv.config();

connectDB();
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pr-client-shubham5213.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", userRoutes);
app.use("/pull-requests", pullRequestRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is Up!");
});
