const mongoose = require("mongoose");

const picturesSchema = new mongoose.Schema({
    src: String,
    alt: String,
    class: String
});

module.exports = mongoose.model('picturesSchema', picturesSchema);