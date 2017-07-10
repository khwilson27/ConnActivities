// Import the model (burger.js) to use its database functions.
var path = require("path");
var db = require("../models");

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home.html
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // my-posts route loads my-posts.html
  app.get("/my-posts", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/my-posts.html"));
  });

  // sign in route loads sign-in.html
  app.get("/sign-in", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/sign-in.html"));
  });

  // sign up route loads sign-up.html
  app.get("/sign-up", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  });

  // grabs posts from db to populate home page with activites
  app.get("/", function (req, res) {
    db.Post.findAll({}).then(function (result) {
      res.json(result);
    });
  });

  // GET route for getting all of the posts
  app.get("/api/post", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // include all of the Users to these posts
    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // creates new user
  app.post("/api/register", function (req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect("/");
    });
  });

  // creates new post
  app.post("/api/post", function (req, res) {
    db.Post.create({
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      category: req.body.category,
      time: req.body.time
    }).then(function () {
      res.redirect("/my-posts");
    });
  });

  // deletes post
  app.delete("/api/my-activities/:id", function (req, res) {
    db.User.destroy({
      where: { id: req.params.id }
    }).then(function () {
      res.redirect('/my-activities');
    });
  });

  // removes User from activity
  app.put("/api/post", function (req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbPost) {
        res.json(dbPost);
      });
  });

} // close module export function
