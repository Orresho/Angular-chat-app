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
  if (!req.body.firstName) {
    res.json({ success: false, message: 'Please enter a firstname' })
  } else {
    if (!req.body.lastName) {
      res.json({ success: false, message: 'Please enter a lastname' })
    } else {
      if (!req.body.userName) {
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
    }
  }

  function createUser() {
    // Create new instance of the user Object
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    });

    // Save user to DB
    user.save()
      // Promise resolved => send success message
      .then(() => {
        res.json({ success: true, message: 'Logged in' });
      })
      // Promise rejected => Throw error
      .catch((err) => {
        if (err) {
          res.json({ success: false, error: err.message })
          if (err.errors) {
            if (error.errors.firstName) {
              res.json({ success: false, error: 'firstname already exists' });
            } else {
              if (error.errors.lastName) {
                res.json({ success: false, error: 'lastname already exists' });
              } else {
                if (error.errors.userName) {
                  res.json({ success: false, error: 'Username already exists' });
                } else {
                  if (error.errors.email) {
                    res.json({ success: false, error: 'Eamail already exists' });
                  }
                }
              }
            }
          }
        }
      });
  }
});


module.exports = router;
