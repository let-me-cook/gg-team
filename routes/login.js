const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect("dashboard");
  } else {
    return res.render("login", { infos: req.flash("infos") });
  }
});

router.post("/", (req, res) => {
  errors = [];

  Gamers.findOne({ email: req.body.email }).then(gamer => {
    if (!gamer) {
      errors.push("Email atau Password salah");
      res.render("login", {
        infos: errors
      });
    } else {
      bcrypt.compare(req.body.password, gamer.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          req.session.uname = gamer.uname;
          req.session.isAuthenticated = true;

          return res.redirect("/dashboard");
        } else {
          errors.push("Email atau Password salah");

          res.render("login", {
            errors
          });
        }
      });
    }
  });
});

module.exports = router;
