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

                // Break
                next();
            }
        })
    }
});

// Get the user profile
router.get('/profile', (req, res, next) => {

    // Query mongo
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
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



module.exports = router;