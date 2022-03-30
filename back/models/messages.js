const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Message",
  tableName: "messages",
  columns: {
    id: {
      primary: true,
      generated: true,
      unique: true,
      type: "int",
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
    imagesUrl: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
    },
    topic: {
      target: "Topic",
      type: "many-to-one",
    },
  },
});
