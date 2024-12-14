const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../db"); // Tämä tuo mukaan Sequelize-yhteyden

// Määritellään User-malli
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Ei voida olla tyhjä
      unique: true, // Varmistaa, ettei kahta samanlaista käyttäjätunnusta
    },
    salasana: {
      type: DataTypes.STRING,
      allowNull: false, // Ei voida olla tyhjä
      unique: false, // Ei tarvitse olla uniikki
    },
  },
  {
    // Täällä määritellään hooks
    hooks: {
      beforeCreate: async (user) => {
        // Hashataan salasana ennen tallentamista
        user.salasana = await bcrypt.hash(user.salasana, 10); // 10 on suola-arvo
      },
      beforeUpdate: async (user) => {
        // Jos salasana on muutettu, hashataan se ennen tallentamista
        if (user.salasana) {
          user.salasana = await bcrypt.hash(user.salasana, 10);
        }
      },
    },
  }
);

// Varmistetaan, että taulu luodaan, jos sitä ei ole jo olemassa
User.sync()
  .then(() => console.log("User-taulu luotu tietokantaan"))
  .catch((err) => console.error("Virhe taulun luomisessa:", err));

module.exports = User;
