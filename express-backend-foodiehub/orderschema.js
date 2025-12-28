const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: Number,
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },

    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = orderSchema;
