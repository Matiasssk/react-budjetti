require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");
const feedbackRouter = require("./routes/feedbackRouter");
const PORT = process.env.PORT || 3001;
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDb", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
