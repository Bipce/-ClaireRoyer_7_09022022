const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User", // Will use table name `category` as default behaviour.
  tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id: {
      primary: true,
      generated: true,
      unique: true,
      type: "int",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    username: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    topics: {
      target: "Topic",
      type: "one-to-many",
      inverseSide: "user",
    },
  },
});
