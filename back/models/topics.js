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
    created: {
      type: "varchar",
    },
    updated: {
      type: "varchar",
      default: null,
    },
    content: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
    },
    messages: {
      target: "Message",
      type: "one-to-many",
      inverseSide: "topic",
    },
  },
});
