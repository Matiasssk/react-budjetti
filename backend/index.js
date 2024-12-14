const app = require("./app");
const mongoose = require("mongoose");
const feedbackRouter = require("./routes/feedbackRouter");
const url =
  "mongodb+srv://matia:helikopteri77@cluster0.qigyc.mongodb.net/budjetti?retryWrites=true&w=majority&appName=Cluster0";

const PORT = 3001;

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
