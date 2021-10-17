require('dotenv').config();
const mongoose = require('mongoose');

// const { staticUrl } = require('../config/url.config');

const locationSchema = mongoose.Schema({
  type: String,
  name: String,
  latitude: String,
  longitude: String,
  placeId: String,
  isCurrent: Boolean
},{
  timestamps: true
});


const Location = mongoose.model('Location', locationSchema);
module.exports = { Location }