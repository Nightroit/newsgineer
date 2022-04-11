const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const secured = require("./routes/api/secured");
const app = express();
const db = require("./config/keys").mongoURI;
const cors = require("cors")

// Bodyparser initialization --------------------------------
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
// MongoDB connection ---------------------------------------
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport ------------------------------------------------
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes ------------------------------------------------
app.use("/api/users", users);

// Secured routes ------------------------------------------------
app.use("/api/", passport.authenticate('jwt', {session: false}), secured)

// Port listening -------------------------------------------
const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));