const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "ikka@#4321", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
