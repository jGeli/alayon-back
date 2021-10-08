const mongoose = require("mongoose");
const connection = "mongodb://localhost:27017/alayon";
const connectionMongo = "mongodb+srv://aicpa420:aicpa420@cluster0.ljfau.mongodb.net/alayon?retryWrites=true&w=majority"



const connectDb = () => {
  // return mongoose.connect(connection);
  return mongoose.connect(
    connectionMongo,
   // connection,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
};

module.exports = connectDb;
