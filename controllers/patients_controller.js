var express = require("express");
var router = express.Router();
var db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { sequelize } = require("../models/index");

router.get("/", function (req, res) {
  // send us to the next get function instead.
  res.redirect("/patients");
});

router.get("/signup", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/patients");
  }
  res.render("signup");
});

router.get("/patients/create", function (req, res) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // send us to the next get function instead.
  if (req.user) {
    res.render("addPatients");
  } else {
    res.render("login");
  }
});

// get route, edited to match sequelize
router.get("/patients", function (req, res) {
  // replace old function with sequelize function
  if (req.user) {
    db.Patient.findAll().then(function (dbPatient) {
      console.log(dbPatient);
      // into the main index, updating the page
      const hbsObject = { patient: dbPatient };
      console.log();
      res.render("listPatients", hbsObject);
    });
  } else {
    res.redirect("/login");
  }
});

// post route to create burgers
router.post("/patients/create", function (req, res) {
  // edited burger create to add in a burger_name
  db.Patient.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    email: req.body.email,
  })
    // pass the result of our call
    .then(function () {
      // log the result to our terminal/bash window
      // console.log(dbPatient);
      // redirect
      res.redirect("/patients");
    });
});

router.put("/patients/:id", function (req, res) {
  // update one of the burgers
  db.Patient.update(
    {
      vaccinated: true,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(function (dbPatient) {
    res.json("/patients");
  });
});

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function (req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(function () {
      res.redirect(307, "/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/patients");
  }
  res.render("login");
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, function (req, res) {
  res.redirect("/patients");
});

module.exports = router;
