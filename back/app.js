const express = require("express");
require("express-async-errors");

const app = express();

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
};

start();
