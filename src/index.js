const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const upload = require("express-fileupload"); //requiring "express-fileupload dependency for uploading file into directory"
//const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, ');
//   },
//   filename: (req, file, cb) => {
//     const { originalName } = file;
//     cb(null, originalName);
//   },
// });

// const upload = multer({ storage });
dotenv.config();
const port = process.env.PROD_PORT || process.env.DEV_PORT;
const app = express();
const fileDetail = require("./database/files"); //importing filedetails from mongoose js file
const server = http.createServer(app);
const publicDirPath = path.join(__dirname, "../public/index.html");
app.use(upload());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(publicDirPath);
});

//uploading file with express-upload
app.post("/file", async (req, res) => {
  if (req.files) {
    var file = req.files.uploadFile;
    fileName = file.name;

    uploadPath = __dirname + "/uploadedFiles/" + fileName;
    console.log(uploadPath);

    file.mv(uploadPath, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("<h1>File Uploaded Successfully </h1>");
        // saving the filaname and size to the mongoDB files_Details database
        try {
          const mongo = new fileDetail({
            uploadedFileName: fileName,
            fileSize: req.body.fileSize + " KB",
          });
          mongo.save().then(() => {});
        } catch (error) {
          res.status(400).send(error);
        }
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Listening on port no ${port}`);
});
