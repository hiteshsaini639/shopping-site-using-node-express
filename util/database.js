const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "local",
  user: "root",
  database: "node-complete",
  password: "ikka@#4321",
});

module.exports = pool.promise();
