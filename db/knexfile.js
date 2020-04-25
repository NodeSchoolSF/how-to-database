const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "/migrations"),
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "/migrations"),
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
