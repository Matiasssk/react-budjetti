require("dotenv").config();
const bodyParser = require("body-parser");
const sequelize = require("./db");

const app = require("./app");
const mongoose = require("mongoose");
const feedbackRouter = require("./routes/feedbackRouter");
const PORT = process.env.PORT || 3001;
const url = process.env.MONGODB_URI;
app.use(bodyParser.json());

// Tarkista yhteys

/*
// Määritellään mallit
const User = require("./models/palauteSQL"); // Otetaan User-malli käyttöön

// Esimerkiksi endpoint, joka hakee kaikki käyttäjät
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll(); // Käytetään Sequelize-mallia
    res.json(users);
  } catch (err) {
    console.error("Virhe käyttäjien hakemisessa:", err);
    res.status(500).send("Sisäinen virhe");
  }
});
*/
/*
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDb", error.message);
  });
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
