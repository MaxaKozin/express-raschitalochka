require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRouter = require("./api/auth/auth.router");
const financeRouter = require("./api/finance/finance.router");

const DB_URI = process.env.DB_URI


mongoose.set("useCreateIndex", true);

const serverInit = async () => {
  await mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  const app = express();
  const PORT = process.env.PORT;

  app.use(express.static(path.resolve(__dirname, "public")));

  app.use(express.json());
  app.use(cors());

  app.use("/api", authRouter);
  app.use("/api/finance", financeRouter);

  app.use((err, req, res, next) => {
    // delete err.stack;
    next(err);
  });

  app.listen(PORT, () => {
    console.log("Server is working on port: ", PORT);
  });
};

serverInit();
