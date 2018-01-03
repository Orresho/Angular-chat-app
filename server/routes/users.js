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

// Authenticate the user
router.post('/login', (req, res, next) => {
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
            res.json({ success: false, message: 'Wrong passowrd or username' });
          } else {

            // Create a jwt token and send back to client with the response
            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
            res.json({
              success: true,
              message: 'Login Succcessfull',
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


// Add user to DB
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

    user.save((err) => {
      if (err) {
        res.json({ success: false, message: 'Email or username is already taken' });
      } else {
        res.json({ success: true, message: 'Account registered' });
      }
    })
  }
});




module.exports = router;
