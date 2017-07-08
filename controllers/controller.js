// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function (app) {

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
