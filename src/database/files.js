const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/files_Details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const fileSchema = new mongoose.Schema({
  uploadedFileName: String,
  fileSize: String,
});

const fileDetail = new mongoose.model("FileDetail", fileSchema);

module.exports = fileDetail;
