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
