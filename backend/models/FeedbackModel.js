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
