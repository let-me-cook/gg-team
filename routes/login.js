const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const bcrypt = require("bcryptjs");

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
      errors.push("Email atau Password Salah");
      req.flash("infos", errors);

      res.render("login", {
        infos: req.flash("infos")
      });
    } else {
      bcrypt.compare(req.body.password, gamer.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          req.session._id = gamer._id;
          req.session.isAuthenticated = true;

          return res.redirect("/dashboard");
        } else {
          errors.push("Email atau Password Salah");
          req.flash("infos", errors);

          res.render("login", {
            infos: req.flash("infos")
          });
        }
      });
    }
  });
});

module.exports = router;
