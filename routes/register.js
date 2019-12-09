const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Gamers = require("../models/Gamers");

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect("dashboard");
  } else {
    return res.render("register");
  }
});

router.post("/", (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect("dashboard");
  } else {
    errors = [];

    if (
      !(
        req.body.email &&
        req.body.uname &&
        req.body.password &&
        req.body.password2
      )
    ) {
      errors.push("Email, Username, atau Password tidak boleh kosong");

      req.flash("infos", errors);

      return res.render("register", {
        infos: req.flash("infos")
      });
    }

    Gamers.findOne(
      { $or: [{ email: req.body.email }, { uname: req.body.uname }] },
      (err, docs) => {
        if (err) throw err;

        if (docs) {
          if (docs.email === req.body.email)
            errors.push("Email sudah diregistrasikan");
          if (docs.uname === req.body.uname)
            errors.push("Username sudah diregistrasikan");
        }

        if (req.body.password !== req.body.password2)
          errors.push("Password tidak sama");

        if (errors.length !== 0) {
          req.flash("infos", errors);

          return res.render("register", {
            infos: req.flash("infos")
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

              req.flash("infos", "Anda telah sukses registrasi");
              return res.redirect("/login");
            });
          });
        });
      }
    );
  }
});

module.exports = router;
