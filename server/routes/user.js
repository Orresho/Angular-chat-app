var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Personal user route');
});


//***************** */
//
// All routes under this middleware will run this middleware.
// All routes that require authorization will go under this middleware 
//
//***************** */

router.use((req, res, next) => {

    // Get token from client headers
    const token = req.headers['authorization'];
    console.log(token);

    if (!token) {
        res.json({ success: false, message: 'No token provided' });
    } else {

        // decode token
        jwt.verify(token, config.secret, (err, decoded) => {

            // respond with error if token is invalid or has expired
            if (err) {
                res.json({ success: false, message: 'Token invalid: ' + err })
            } else {

                // Assign decoded token to global variable
                req.decoded = decoded;
                console.log(req.decoded);

                // Break
                next();
            }
        })
    }
});

// Get the user profile
router.get('/profile', (req, res, next) => {

    // Query mongo
    User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            if (!user) {
                res.json({ success: false, message: 'User not found' });
            } else {

                // Send the user as an object in the response
                res.json({ success: true, user: user });
            }
        }
    });
});

// Edit the profile
router.put('/editProfile', (req, res) => {

    User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!user) {
                res.json({ success: false, message: 'Unable to authenticate User' });
            } else {

                // Update the user data with the inputed fields data
                user.username = req.body.username;
                user.email = req.body.email;
                user.firstname = req.body.firstname;
                user.lastname = req.body.lastname;
                user.birthDate = req.body.birthDate;
                user.gender = req.body.gender;

                // Save the updated user fields
                user.save((err) => {
                    if (err) {
                        if (err.errors) {
                            res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                            res.json({ success: false, message: err }); // Return error message
                        }
                    } else {
                        res.json({ success: true, message: 'User Updated!' }); // Return success message
                    }
                })
            }
        }
    });

})



module.exports = router;