const mongoose = require("mongoose");

const webSchema = new mongoose.Schema({
    phone: Number,
    mail: String,
    address: String,
    bookingContent: String,
    bookingClass: String,
    bookingAlt: String,
    bookingSrc: String,
    day1: String,
    hours1: String,
    day2: String,
    hours2: String,
    about: String
});

module.exports = mongoose.model('webSchema', webSchema);