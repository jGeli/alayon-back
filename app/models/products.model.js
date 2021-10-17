require('dotenv').config();
const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: String,
    prices: [{
        type: String, //KG, SPCS, EPCS,
        price: Number,
        isDeleted: Boolean
    }],
    isDeleted: Boolean
},{
  timestamps: true
});


const Product = mongoose.model('Product', productSchema);
module.exports = { Product }