const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

module.exports = mongoose.model('dishesSchema', dishesSchema);