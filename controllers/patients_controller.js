var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
  // send us to the next get function instead.
  res.redirect("/patients");
});

router.get("/patients/create", function (req, res) {
  // send us to the next get function instead.
  res.render("logPatient");
});

// get route, edited to match sequelize
router.get("/patients", function (req, res) {
  // replace old function with sequelize function
  db.Patients.findAll().then(function (dbPatient) {
    console.log(dbPatient);
    // into the main index, updating the page
    var hbsObject = { patient: dbPatient };
    return res.json(dbPatient);
    // return res.render("index", hbsObject);
  });
});

// post route to create burgers
router.post("/patients/create", function (req, res) {
  // edited burger create to add in a burger_name
  db.patient
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      email: req.body.email,
    })
    // pass the result of our call
    .then(function (dbPatient) {
      // log the result to our terminal/bash window
      console.log(dbPatient);
      // redirect
      res.redirect("/patients");
    });
});

// put route to devour a burger
// router.put("/burgers/update/:id", function (req, res) {
//     // update one of the burgers
//     db.Burger.update({
//         devoured: true
//     },
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     ).then(function (dbBurger) {
//         res.json("/");
//     });
// });

module.exports = router;
