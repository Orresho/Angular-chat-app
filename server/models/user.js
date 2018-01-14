var mongoose = require('mongoose'); // Node Tool for MongoDB
var uniqueValidator = require('mongoose-unique-validator'); // Provides unique validation to mongo
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: {type: String},
    lastname: {type: String},
    birthDate: {
        year: {type: String},
        month: {type: String},
        day: {type: String}
    },
    gender: {type: String},
    stars: {type: Number}
    
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);