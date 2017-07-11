// Import the model to use its database functions.
var path = require("path");
var db = require("../models");


// Auth Packages
var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require("jsonwebtoken");

module.exports = function (app) {

  // HTML ROUTES
  //=================================================================================

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

  // API ROUTES
  //=================================================================================

  // creates new user
  app.post("/api/register", function (req, res) {

    // create salt and use salt to hash the plain text password
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);

    // store new user info + salt + hashed password into db
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      salt: salt
    }).then(function () {
      res.end("Registration complete!");
    });
  });

  // after user logs in, compare entered password with db password 
  app.post("/api/login", function (req, res) {
    db.User.findOne({ where: { email: req.body.email } }).then(function (data) {

      if (!data) {
        res.json({
          success: false,
          message: 'User not found',
          token: null
        });
      } else {

        // hash the inputted password
        var hash = bcrypt.hashSync(req.body.password, data.salt);

        // if user is found and password is right
        if (data.password === hash) {

          // create a token
          var token = jwt.sign({
            "id": data.id,
            "username": data.username,
            "email": data.email
          }, "secretWord", {
              expiresIn: "24h" // expires in 24 hours
            });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } else {
          // otherwise, return login failure message
          res.json({
            success: false,
            message: 'Incorrect login info',
            token: null
          });
        }
      }

    });
  });

  // GET route for getting all posts where partnerId is null
  app.get("/api/post", function (req, res) {

    var token = req.headers.authorization;
    var decodedToken;

    if (token) {
      // Checks to see if it's expired
      jwt.verify(token, 'secretWord', function (err, decoded) {
        decodedToken = decoded;
      });
    }
    
    // find all of the posts and return username and posts
    db.Post.findAll({where : {
      partnerId : null
    }}).then(function (dbPost) {
      var data = {
        posts: dbPost
      };

      if (decodedToken) {
        data.username = decodedToken.username
      } else {
        data.username = null;
      }

      res.json(data);
    });
  });

  // Get route for getting a single user's posts
  app.get("/api/my-post", function (req, res) {

    var token = req.headers.authorization;

    // Checks to see if it's expired
    jwt.verify(token, 'secretWord', function (err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
        console.error(err);
      } else {

        // find all of the posts to this user
        db.Post.findAll({
          where: { UserId: decoded.id },
        }).then(function (dbPost) {
          var data = {
            username: decoded.username,
            posts: dbPost
          }
          res.json(dbPost);
        });
      };
    });
  });

  // creates new post
  app.post("/api/post", function (req, res) {

    var token = req.body.authorization;

    // Checks to see if it's expired
    jwt.verify(token, 'secretWord', function (err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
        console.error(err);
      } else {
        console.log(decoded);
        var userId = decoded.id

        db.Post.create({
          UserId: decoded.id,
          title: req.body.title,
          description: req.body.description,
          address: req.body.address,
          category: req.body.category,
          time: req.body.time
        }).then(function () {
          res.end("Added new post!");
        });
      }
    })
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
