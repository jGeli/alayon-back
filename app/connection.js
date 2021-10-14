const mongoose = require("mongoose");
const connection = "mongodb://localhost:27017/alayon";
const connectionMongo = "mongodb+srv://aicpa420:aicpa420@cluster0.ljfau.mongodb.net/alayon?retryWrites=true&w=majority"
<<<<<<< HEAD



=======
>>>>>>> 11d35118442ded9fe2f8890358e3587b5a50f3b3
const connectDb = () => {
  // return mongoose.connect(connection);
  return mongoose.connect(
    connectionMongo,
<<<<<<< HEAD
   // connection,
=======
    // connection,
>>>>>>> 11d35118442ded9fe2f8890358e3587b5a50f3b3
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
};

module.exports = connectDb;
