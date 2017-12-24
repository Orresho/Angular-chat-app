var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Add user to DB
router.post('/register', function (req, res, next) {

  let promise = new Promise((resolve, reject) => {

    // Check if user has provided information
    if (!req.body.firstName) {
      reject();
    } else {
      if (!req.body.lastName) {
        reject();
      } else {
        if (!req.body.userName) {
          reject();
        } else {
          if (!req.body.email) {
            reject();
          } else {
            if (!req.body.password) {
              reject();
            } else {

              // Call resolve
              resolve();
            }
          }
        }
      }
    }
  });

  // Catch promise error => throw
  promise.catch(() => {
    res.json({ success: false, message: 'Some fields are missing, please enter information on all required fields' });
  })

    // In case user enters all credentials => resolve promise
    .then(() => {
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
        })
    })

});


module.exports = router;
