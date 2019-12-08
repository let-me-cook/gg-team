const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Gamers = require("../models/Gamers");

router.get("/", (req, res) => {
  if (req.session.authorized) {
    return res.redirect("dashboard");
  } else {
    return res.render("register");
  }
});

router.post("/", (req, res) => {
  if (req.session.authorized) {
    res.redirect("dashboard");
  } else {
    console.log(req.body);
    Gamers.findOne({ email: req.body.email }, (err, docs) => {
      errors = [];
      if (err) throw err;

      if (docs) errors.push("Email sudah diregistrasikan");
      if (req.body.password !== req.body.password2)
        errors.push("Password tidak sama");

      if (errors.length !== 0) {
        console.log(errors);
        return res.render("register", {
          errors
        });
      }

      newGamer = {
        uname: req.body.uname,
        email: req.body.email
      };

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if (err) throw err;

          new Gamers({
            uname: req.body.uname,
            email: req.body.email,
            password: hash
          }).save((err, product) => {
            if (err) throw err;

            return res.redirect("/login");
          });
        });
      });
    });
  }
});

module.exports = router;
