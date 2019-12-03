const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const gamers = require('./models/GamersData');
const mongoose = require("mongoose");


const app = express();

const db = require("./config/keys.js").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Koneksi database sukses"))
  .catch(err => console.log(err));


// Serve Logger Middleware
//app.use(logger);

// Serve Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayour: "main" }));
app.set("view engine", "handlebars");

// Serve Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Gamers API Route
app.use("/api/gamers", require("./routes/api/gamers"));

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", { 
    title: "GG Team", 
    gamers
  })
});

const PORT = process.env.PORT | 5000;

// Serve Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("Server started in port", PORT);
});
