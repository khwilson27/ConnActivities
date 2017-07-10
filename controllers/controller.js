// Import the model to use its database functions.
var path = require("path");
var db = require("../models");
var passport = require("passport");

module.exports = function (app) {

  // HTML ROUTES
  // ================================================================================================

  // home route to home.html
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // my posts route to my-posts.html
  app.get("/my-posts", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/my-posts.html"));
  });

  // sign in route to sign-in.html
  app.get("/sign-in", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/sign-in.html"));
  });

  // sign up route to sign-up.html
  app.get("/sign-up", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  });


  // API ROUTES
  // ================================================================================================

  // grabs posts from db to populate home page with activites
  app.get("/posts", function (req, res) {
    db.Post.findAll({}).then(function (result) {
      res.json(result);
    });
  });

  // create user based on the username/email/password inputed
  app.post("/login", passport.authenticate(
    "local", {
      successRedirect: "/home",
      failureRedirect: "/sign-in"
  }));

  // create user based on the username/email/password inputed
  app.post("/register", function (req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect("/");
    });
  });

  // allow user to delete activity cards that the user created
  app.delete("/my-activities/:id", function (req, res) {
    db.User.destroy({
      where: { id: req.params.id }
    }).then(function () {
      res.redirect('/my-activities');
    });
  });

} // close module export function
