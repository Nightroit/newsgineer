const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");


// REGISTER END-POINT:-----------------------------------------------------------------------


router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.json({invalidData: 1, errors});
      }
    User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.json({alreadyExists: 1});
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

        // BCRYPT HASING -----------------------------------

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  const payload = {
                    id: user.id,
                    name: user.name
                  };
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 31556926
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token
                      });
                    }
                  );
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
);


// LOGIN END-POINT: -----------------------------------------------------------------------


router.post("/login", (req, res) => {
  console.log(req.body)
  const { errors, isValid } = validateLoginInput(req.body);
  
  if (!isValid) {
    console.log(errors)
    return res.status(400).json(errors);
  }
  
  const usernameOrEmail =  req.body.username;
  const password = req.body.password;
  
  User.findOne({ name: usernameOrEmail }).then(user => {
    if (!user) {
      return res.json({ notFound: "User not found"})
    }

    // Comparing the hashed password -----------------------------------

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name, 
          email: user.email
        };

        // Signing the token -----------------------------------

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


module.exports = router;