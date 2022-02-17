require("dotenv").config();
require("express-async-errors");
require("reflect-metadata");

const { createConnection } = require("typeorm");
const express = require("express");
const User = require("./models/users");
const Topic = require("./models/topics");
const error = require("./middlewares/error");
const path = require("path");

const usersRouter = require("./routes/users");
const topicsRouter = require("./routes/topics");

const app = express();

app.use(express.json());

(async () => {
  try {
    await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [User, Topic],
    });
    if (createConnection) console.log("Connect to database");

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
})();

app.use("/api", usersRouter);
app.use("/api/topic", topicsRouter);
app.use(error);
app.use("/images", express.static(path.join(__dirname, "images")));
