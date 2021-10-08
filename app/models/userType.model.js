const mongoose = require("mongoose");


const userTypeSchema = mongoose.Schema({
    name: String,
    description: String
  })


const UserType = mongoose.model('UserType', userTypeSchema);
module.exports = { UserType }
