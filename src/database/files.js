const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = process.env.PROD_MONGODB_URL || process.env.DEV_MONGODB_URL;
//connecting database with database name "files_Details"
mongoose
  .connect(url, {
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
