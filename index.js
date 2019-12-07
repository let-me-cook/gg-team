const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");


const app = express();

const db = require("./config/keys.js").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Database Connection Is Successful"))
  .catch(err => console.log(err));

// Serve Logger Middleware
//app.use(logger);

// Serve Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Gamers API Route
app.use("/api/gamers", require("./routes/api/gamers"));
app.use("/", require("./routes/index"));

const PORT = process.env.PORT | 5000;

// Serve Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("Server started in port", PORT);
});


