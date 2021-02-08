const mongoose = require("mongoose");

//connecting database with database name "files_Details"
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

//creating a schema for uploading filename and it's size of type string

const fileSchema = new mongoose.Schema({
  uploadedFileName: String,
  fileSize: String,
});

//creating a new collection "FileDetail"  which will be created as "filesdetails"
const fileDetail = new mongoose.model("FileDetail", fileSchema);

module.exports = fileDetail;
