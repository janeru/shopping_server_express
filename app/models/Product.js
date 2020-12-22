const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 10,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);