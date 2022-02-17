const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Topic",
  tableName: "topics",
  columns: {
    id: {
      primary: true,
      generated: true,
      unique: true,
      type: "int",
    },
    title: {
      type: "varchar",
    },
    datetime: { type: "varchar" },
    message: { type: "varchar" },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      // joinTable: true,
      // cascade: true,
    },
  },
});
