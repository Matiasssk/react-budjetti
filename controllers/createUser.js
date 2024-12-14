const User = require("../models/UserSQL");

exports.addUser = async (req, res) => {
  const body = req.body;

  try {
    // Luodaan uusi palautteen tietue
    const newUser = await User.create({
      name: body.name,
      salasana: body.salasana,
    });

    // Palautetaan luotu palautteen tiedot
  } catch (error) {
    console.error("Virhe palautteen tallentamisessa:", error);
    res.status(400).json({
      error: "Virhe palautteen tallentamisessa",
      details: error.message,
    });
  }
};
