const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    img: String,
    descript: String
});


module.exports=productSchema;
