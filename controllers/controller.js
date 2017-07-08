// Import the model (burger.js) to use its database functions.
var path = require("path");
var db = require("../models");

module.exports = function (app) {
   
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // my-posts route loads cms.html
  app.get("/my-posts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/my-posts.html"));
  });

  // blog route loads blog.html
  app.get("/sign-in", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sign-in.html"));
  });

  // authors route loads author-manager.html
  app.get("/sign-up", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  });

    // grabs posts from db to populate home page with activites
  app.get("/", function (req, res) {
    db.Post.findAll({}).then(function (result) {
      res.json(result);
    });
  });

  app.post("/register", function (req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect("/");
    });
  });

  app.delete("/my-activities/:id", function (req, res) {
    db.User.destroy({
      where: { id: req.params.id }
    }).then(function () {
      res.redirect('/my-activities');
    });
  });

} // close module export function
