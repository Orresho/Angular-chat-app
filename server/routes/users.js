var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Authentication route
router.post('/login', (req, res, next) => {

  // Check if user has entered forms
  if (!req.body.username) {
    res.json({ success: false, message: 'Please enter a username' }) // return error
  } else {
    if (!req.body.password) {
      res.json({ success: false, message: 'Please enter a password' }) // return error
    } else {

      // Check for user in database
      findUser()

    }
  }

  function findUser() {

    // Check for user in DB, if found => return user else return error
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ success: false, message: 'Wrong password or username' });
        } else {

          // Compare hashed password user enters and password from user in database
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, message: 'Wrong password or username' });
          } else {

            // Create a jwt token and send back to client with the response
            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
            res.json({
              success: true,
              message: 'Login Successfull',
              token: token,
              user: {
                username: user.username
              }

            });
          }
        }
      }
    });
  }
});


// Register route
router.post('/register', (req, res, next) => {

  // Make sure user no fields are left empty
  if (!req.body.username) {
    res.json({ success: false, message: 'Please enter a username' })
  } else {
    if (!req.body.email) {
      res.json({ success: false, message: 'Please enter an email' })
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: 'Please enter a password' })
      } else {

        // Create user and insert to Database
        createUser();
      }
    }
  }

  function createUser() {
    // Create new instance of the user object/model
    let user = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    // Save user to database
    user.save((err) => {

      // Check for errors => return error if username or email already exists (using mongoose-unique-validator)
      if (err) {
        res.json({ success: false, message: 'Email or username is already taken' });
      } else {
        res.json({ success: true, message: 'Account registered' });
      }
    })
  }

});


module.exports = router;
