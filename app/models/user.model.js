require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 10;
const { UserType } = require('./userType.model');
// const { staticUrl } = require('../config/url.config');

const userSchema = mongoose.Schema({
 firstName: {
 type: String,
 maxlength: 100
},
 lastName: {
 type: String,
 maxlength: 100
},
googleId: String,
facebookId: String,
mobile: {
  type: String,
  maxlength: 9
},
userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType"
},
 accessToken: {
 type: String
 },

},{
  timestamps: true
});




//saving user data
userSchema.pre('save', function (next) {
 var user = this;
 var accessToken = jwt.sign(user._id.toHexString(), process.env.SECRET);
 user.accessToken = accessToken;   
 next();
});




//for comparing the users entered password with database duing login 
userSchema.methods.comparePassword = function (candidatePassword, callBack) {
  console.log(candidatePassword)
 bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
 if (err) return callBack(err);
 callBack(null, isMatch);
});
}

//for generating token when loggedin
userSchema.methods.generateToken = function (callBack) {
 var user = this;
 var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
 user.accessToken = token;
 user.save(function (err, user) {
 if (err) return callBack(err) 
 callBack(null, user)
});
};

//validating token for auth routes middleware
userSchema.statics.findByToken = function (accessToken, callBack) {
 var user = this;
 jwt.verify(accessToken, process.env.SECRET, function (err, decode) {//this decode must give user_id if accessToken is valid .ie decode=user_id
  
  user.findOne({_id: decode, accessToken: accessToken }, { password: 0 }, function (err, usr) {
    // usr.populate('userType');
    user.populate('userType');

   if(usr){
    delete usr.password;
   }
 if (err) return callBack(err);
 callBack(null, usr);
 });
});
};




const User = mongoose.model('User', userSchema);
module.exports = { User }