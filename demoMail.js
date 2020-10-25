const express = require("express");
const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

// let randomCode = null;
// randomCode = Math.floor(Math.random() * 10000);

let randomCode = null;
randomCode = Math.floor(Math.random()*10000)
var transporter = nodemailer.createTransport({
 Service: "smtp.gmail.com",
  auth: {
    user: "zaloaltp@gmail.com",
    pass: "Zaloaltp2020@",
  },
});


transporter.use(
  "compile",
  hbs({
    viewPath: "views",
    extName: ".ejs",
  })
);

app.get("/", function (req, res) {
  res.render("form");
});

app.post("/mail", function (req, res) {
  var userName = req.body.email;
  var passWord = req.body.password;
  transporter.sendMail(
    {
      from: "zaloaltp@gmail.com",
      to: userName,
      subject: "Verification",
      template: "mail",

      context: {
        randomCode
      }
    },
    function (err, response) {
      if (err) {
        res.send("that bai");
      } else {
        res.send("thanh cong");
      }
    }
  );
});
