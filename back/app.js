require("dotenv").config();
require("express-async-errors");
require("reflect-metadata");

const { createConnection } = require("typeorm");
const express = require("express");
const User = require("./models/users");
const Topic = require("./models/topics");
const Message = require("./models/messages");

const app = express();
require("./routes/main")(app);

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
      entities: [User, Topic, Message],
    });
    if (createConnection) console.log("Connect to database");

    const PORT = process.env.PORT || 5000;
    await app.listen(PORT);
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
})();
