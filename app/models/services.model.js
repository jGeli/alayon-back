require('dotenv').config();
const mongoose = require('mongoose');

// const { staticUrl } = require('../config/url.config');

const serviceSchema = mongoose.Schema({
  name: String,
  isStandard: Boolean,
  isExpress: Boolean,
  isKg: Boolean,
  isPcs: Boolean,
  isDeleted: Boolean,
  products: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }
  ]
},{
  timestamps: true
});


const Service = mongoose.model('Service', serviceSchema);
module.exports = { Service }