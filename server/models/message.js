const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    createdBy: { type: String },
    content: { type: String, required: true, maxlength: 100 },
    timeOfPost: { type: Date, default: Date.now() },

    // Likes and dislikes
    likes: { type: String, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: String, default: 0 },
    dislikedBy: { type: Array }


    // Add things like reply later
    //**** */
});

module.exports = mongoose.model('Message', messageSchema);