const express = require("express");
const router = express.Router();

router.get("/debug1", (req, res) => {
  return res.render("debug/debug1");
});

router.get("/debug2", (req, res) => {
  return res.render("debug/debug2");
});

router.get("/debugAlfath", (req, res) => {
  return res.render("debug/debugAlfath");
});


module.exports = router;