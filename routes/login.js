const express = require("express");
const router = express.Router();
const gamers = require("../models/Gamers")


router.get("/", (req, res) => {
  if (req.session.authorized) {
    return res.redirect("dashboard");
  } else {
    return res.render("login");
  }
});

router.post("/", (req, res) => {
  if (req.session.authorized) {
    // Mahasiswa.countDocuments({}, (err, documentCount) => {
    //   new Mahasiswa({
    //     id: documentCount + 1,
    //     nama: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     kelas: req.body.kelas
    //   }).save((err, product) => {
    //     if (err) throw err;

    //     return res.redirect("/dosen");
    //   });
    // });
  } else {

    console.log(req.body);
    // Dosen.findOne({ email: req.body.email }, (err, docs) => {
    //   if (err) throw err;

    //   if (!docs || docs.password != req.body.password) {
    //     return res.render("login");
    //   }

    //   req.session.authorized = true;
    //   req.session.idDosen = docs.id;
    //   req.session.namaDosen = docs.nama;

    //   return res.redirect("/dosen");
    // });
  }
});

module.exports = router;
