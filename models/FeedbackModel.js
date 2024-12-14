/*

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    organisaatio: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

*/

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db"); // Tämä tuo mukaan Sequelize-yhteyden

// Määritellään Feedback-malli
const Feedback = sequelize.define(
  "Feedback",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false, // Tämä kenttä on pakollinen
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Tämä kenttä on pakollinen
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Tämä kenttä on valinnainen
    },
    organisaatio: {
      type: DataTypes.STRING,
      allowNull: true, // Tämä kenttä on valinnainen
    },
  },
  {
    // Timestamps-määritys, joka lisää `createdAt` ja `updatedAt` kentät
    timestamps: true,
  }
);

// Varmistetaan, että taulu luodaan, jos sitä ei ole jo olemassa
Feedback.sync()
  .then(() => console.log("Feedback-taulu luotu tietokantaan"))
  .catch((err) => console.error("Virhe taulun luomisessa:", err));

module.exports = Feedback;
