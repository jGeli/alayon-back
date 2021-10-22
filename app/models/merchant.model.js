require('dotenv').config();
const mongoose = require('mongoose');

// const { staticUrl } = require('../config/url.config');

const merchantSchema = mongoose.Schema({
  name: String,
  description: String,
  businessLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
  },
  businessHours: [{
    day: String,
    open: Date,
    close: Date
  }],
  businessType: String,
  mobile: String,
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services"
    }
  ],
  imgUrl: String
},
{
  timestamps: true
});


merchantSchema.statics.setupDetails = function (data, callBack) {
  var user = this;
  jwt.verify(accessToken, process.env.SECRET, function (err, decode) {//this decode must give user_id if accessToken is valid .ie decode=user_id
   
   user.findOne({_id: decode, accessToken: accessToken }, { password: 0 }, function (err, usr) {
 
    if(usr){
     delete usr.password;
    }
  if (err) return callBack(err);
  callBack(null, usr);
  });
 });
 };


const Merchant = mongoose.model('Store', merchantSchema);
module.exports = { Merchant }