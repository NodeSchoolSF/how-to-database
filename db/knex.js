const knexfile = require("./knexfile");

const config = knexfile[process.env.NODE_ENV || "development"];

module.exports = require("knex")(config);
