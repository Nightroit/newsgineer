const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const secured = require("./routes/api/secured");
const app = express();
const db = require("./config/keys").mongoURI;
const cors = require("cors")

const Posts = require("./models/Posts")

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

app.post("/api/", (req, res) => {
  let query;

  let currentDate = new Date(); 
  let now = new Date();

  let last = 7; 
  if(req.body.last) {
    last = req.body.last; 
  }

  now.setDate(now.getDate()-last); 
  let oldDate = now; 
  query =   {
    "createdAt": {
      $gte: oldDate,
      $lt: currentDate,
    }, 
  }
  if(req.body.category != undefined) {
      query =   {
    "createdAt": {
      $gte: oldDate,
      $lt: currentDate,
    }, 
    "category": req.body.category
    }
  }


   Posts.find(query).sort({"upVotesLen": -1}).skip(req.body.skip).limit(14).then(data => {
        res.status(200).json(data)
    })
  
  })

// Secured routes ------------------------------------------------
app.use("/api/", passport.authenticate('jwt', {session: false}), secured)


// Non Secured routes ---------------------------------------------

// Port listening -------------------------------------------
const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));