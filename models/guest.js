var mongoose = require('mongoose');

var guestSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    attending: Boolean,
    number_attending: Number
});

module.exports = mongoose.model("Guest", guestSchema);