const { static, urlencoded } = require("express");
const express = require("express");
const http = require("http");
const path = require("path");
const upload = require("express-fileupload");
const port = process.env.port || 3000;
const app = express();
const fileDetail = require("./database/files");
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);
const publicDirPath = path.join(__dirname, "../public/index.html");
app.use(upload());
app.get("/", (req, res) => {
  res.sendFile(publicDirPath);
});
app.post("/file", async (req, res) => {
  if (req.files) {
    var file = req.files.uploadFile;
    fileName = file.name;
    uploadPath = __dirname + "/uploadedFiles/" + file.name;

    file.mv(uploadPath, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("<h1>File Uploaded Successfully </h1>");

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
