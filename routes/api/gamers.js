const express = require('express');
const router = express.Router();
const gamers = require("../../GamersData"); 

// Get All gamers
router.get("/", (req, res) => {
  res.json(gamers);
});


// GET Specific Gamers by ID
router.get("/:id", (req, res) => {
  const found = gamers.some(gamer => gamer.id === parseInt(req.params.id));

  if (found) {
    res.json(gamers.filter(gamer => gamer.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg : `Gamer with id:${req.params.id} not found` });
  }
});

// Add gamer by POST by JSON
router.post("/", (req, res) => {
  const newGamer = {
    id: gamers.length + 1,
    uname: req.body.uname,
    email: req.body.email,
    game: req.body.game,
  }

  if(!newGamer.uname || !newGamer.email || !newGamer.game){
    res.redirect('/')
    res.status(400).json({ msg: "Please include username, email and game", newGamer });
  }

  gamers.push(newGamer);

  //res.json(gamers.slice(-3));

  res.redirect('/')
})

// Update Gamer by PUT with ID and JSON
router.put('/:id', (req, res) => {
  const found = gamers.some(gamer => gamer.id === parseInt(req.params.id));

  if(found){
    const updateGamer = req.body;

    gamers.forEach(gamer => {
      if(gamer.uname === parseInt(req.params.uname)){
        gamer.uname = updateGamer ? updateGamer.name : gamer.name; 
        gamer.email = updateGamer ? updateGamer.email : gamer.email; 
        gamer.game = updateGamer ? updateGamer.game : gamer.game;

        res.json({ msg: "Gamer Updated ", gamer });
      }
    })
  } else {
    res.status(400).json({ msg : `Gamer ${req.params.id} not found` });
  }
}) 

// DELETE Gamer By ID
router.delete("/:id", (req, res) => {
  const found = gamers.some(gamer => gamer.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Gamer deleted',
      gamers : gamers.filter(gamer => gamer.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg : `gamer ${req.params.id} not found` });
  }
});

module.exports = router;