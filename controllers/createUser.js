const express = require("express");
const { User } = require("../models/User"); // Tuodaan User-malli

const router = express.Router();

// Funktio uuden käyttäjän luomiseksi
async function createUser(username, password) {
  try {
    // Tarkistetaan, onko käyttäjänimi jo varattu
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      console.log("Käyttäjätunnus on jo käytössä.");
      return { status: 400, message: "Käyttäjätunnus on jo käytössä." }; // Palautetaan virhe
    }

    // Luodaan uusi käyttäjä ja tallennetaan se tietokantaan
    const user = await User.create({
      username,
      salasana: password, // Salasana hashataan automaattisesti ennen tallentamista
    });

    return { status: 201, message: "Käyttäjä luotu", user };
  } catch (error) {
    console.error("Virhe käyttäjän luomisessa:", error);
    return { status: 500, message: "Virhe käyttäjän luomisessa" };
  }
}

// POST-pyyntö, joka luo uuden käyttäjän
router.post("/", async (req, res) => {
  const { username, password } = req.body; // Haetaan käyttäjänimi ja salasana pyynnöstä

  const result = await createUser(username, password);

  res
    .status(result.status)
    .json({ message: result.message, user: result.user || null });
});

module.exports = router;
