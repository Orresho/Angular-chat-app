var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/', (req, res) => {
    res.send('test');
});

// Send a new message
router.post('/newMessage', (req, res, next) => {

    // Check if the required fields are filled in
    if (!req.body.content) {
        res.json({ success: false, message: 'Can\'t send empty message' })
    } else {
        if (!req.body.user.username) {
            res.json({ success: false, message: 'Message sender is needed' })
        } else {

            // Save message
            saveMessage();
        }
    }

    // Function to save message to database
    function saveMessage() {
        const message = new Message({
            content: req.body.content,
            createdBy: req.body.user.username
        });

        message.save((err) => {

            // Check if it's an error
            if (err) {

                // Check if error is a validation error
                if (err.errors) {

                    // Check if error is in the content
                    if (err.errors.content) {

                        // Send an content length error
                        let messageLength = req.body.content.length;
                        res.json({ success: false, message: 'Message is to long', thisMessageLength: messageLength });
                    }
                    res.json({ success: false, message: err.errors });
                }
                res.json({ success: false, message: err });
            } else {

                // If no errors were found, send a success message!
                res.json({ success: true, message: 'Message sent successfully!' });
            }

        });

    }
});


// Retrieve all messages
router.get('/allMessages', (req, res) => {

    // Query database
    Message.find({}, (err, data) => {

        // Check for error
        if (err) {
            res.json({ success: false, message: err });
        } else {

            // Check if there are any messages in database
            if (!data.content) {
                res.json({ success: false, message: 'There are no messages yet, be first!' });
            } else {
                // Send the data with messages to client
                res.json({ success: true, data: data });
            }
        }
    });
});

module.exports = router;