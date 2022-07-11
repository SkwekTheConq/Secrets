
//.env(dotenv) is for adding environment variables //
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

// LEVEL 3 - HASHING WITH MD5 
// const md5 = require("md5");

// LEVEL 2 - Encryption / ADD ENV VARS /
// const encrypt = require("mongoose-encryption");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const md5 = require("md5");

//Dev stuff - auto reload//
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// end//

const app = express();

// LEVEL 3 - HASHING WITH MD5
// console.log("weak password hash: " + md5("123456"));
// console.log("strong password hash: " + md5("sjkhdfsd8f7jhsd$%$sdfsdfHJKHSJFHDSF78324"));


//Dev stuff - auto reload//
app.use(connectLiveReload());
// end//

// ADD ENV VARS //
// console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// LEVEL 2 - Encryption
// const secret = "Thisisourlittlesecret.";
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

// ADD ENV VARS //
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });


userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  
  // //LEVEL 1 - USERNAME & PASSWORD / LEVEL 2 - ENCRYPTION / ADD ENV VARS
  // const newUser =  new User({
  //   email: req.body.username,
  //   password: req.body.password
  // });
  // newUser.save(function(err){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("secrets");
  //   }
  // });

  // LEVEL 3 - HASHING WITH md5
  // const newUser =  new User({
  //   email: req.body.username,
  //   password: md5(req.body.password)
  // });
  // newUser.save(function(err){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("secrets");
  //   }
  // });

});

app.post("/login", function (req, res) {
  
//   LEVEL 1 - USERNAME & PASSWORD / LEVEL 2 - ENCRYPTION / ADD ENV VARS
//   const username = req.body.username;
//   const password = req.body.password;
//   User.findOne({email: username}, function(err, foundUser){
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         if (foundUser.password === password) {
//           res.render("secrets");
//         }
//       }
//     }
//   });


// LEVEL 3 - HASHING WITH MD5
// const username = req.body.username;
//   const password = md5(req.body.password);

//   User.findOne({email: username}, function(err, foundUser){
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         if (foundUser.password === password) {
//           res.render("secrets");
//         }
//       }
//     }
//   });


});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
