const mongoose = require("mongoose");
const connection = "mongodb://localhost:27017/mongo-test";
const connectionMongo = "mongodb+srv://aicpa420:aicpa420@cluster0.ljfau.mongodb.net/aicpadb?retryWrites=true&w=majority"
const connectDb = () => {
  // return mongoose.connect(connection);
  return mongoose.connect(connectionMongo);

};

module.exports = connectDb;
