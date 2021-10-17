require('dotenv').config();
const mongoose = require('mongoose');


const objectRefShema = mongoose.Schema({
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


const objectRef = mongoose.model('objectRef', objectRefShema);
module.exports = { objectRef }