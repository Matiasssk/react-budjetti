/*
const Feedback = require("../models/FeedbackModel");

exports.addFeedback = async (req, res) => {
  const body = req.body;
  const newFeedback = new Feedback({
    content: body.content,
    name: body.name,
    email: body.email,
    organisaatio: body.organisaatio,
  });
  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ error: "virhe palautteen tallentamisessa", error });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Virhe palautteiden hakemisessa" });
  }
};
*/

// controllers/feedbackController.js
const Feedback = require("../models/FeedbackModel");

exports.addFeedback = async (req, res) => {
  const body = req.body;
  try {
    // Luodaan uusi palautteen tietue
    const newFeedback = await Feedback.create({
      content: body.content,
      name: body.name,
      email: body.email,
      organisaatio: body.organisaatio,
    });

    // Palautetaan luotu palautteen tiedot
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Virhe palautteen tallentamisessa:", error);
    res.status(400).json({
      error: "Virhe palautteen tallentamisessa",
      details: error.message,
    });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    // Haetaan kaikki palautteet
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Virhe palautteiden hakemisessa:", error);
    res.status(500).json({
      message: "Virhe palautteiden hakemisessa",
      details: error.message,
    });
  }
};
