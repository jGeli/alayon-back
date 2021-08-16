const mongoose = require("mongoose");


const userTypeSchema = mongoose.Schema({
    name: String,
  })


const UserType = mongoose.model('UserType', userTypeSchema);
module.exports = { UserType }
