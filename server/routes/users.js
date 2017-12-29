var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Authenticate the user
router.post('/login', (req, res, next) => {
  res.send('works');
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
      password: req.body.password
    });

    user.save((err) => {
      if (err) {
        res.json({ success: false, message: 'Email or username is already taken' });
      } else {
        res.json({ success: true, message: 'Account registered' });
      }
    })
  }
})




module.exports = router;
