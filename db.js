// db.js
const { Sequelize } = require("sequelize");

// Määritellään yhteys tietokantaan
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "process.env.DB_HOST",
    dialect: "mysql",
    logging: false,
  }
);

// Yhdistä MySQL-tietokantaan ja varmista yhteys
sequelize
  .authenticate()
  .then(() => {
    console.log("Yhteys MySQL-tietokantaan onnistui!");
  })
  .catch((err) => {
    console.error("Virhe yhteydessä MySQL-tietokantaan:", err);
  });

// Vie sequelize-määritykset, jotta ne voidaan tuoda muualle
module.exports = sequelize;
