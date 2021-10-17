const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDb = require('./app/connection');
const cors = require('cors');
const { initData } = require('./app/utils/initFunctions');
const PORT = 42000;

var corsOptions = {
  origin: '*',
  // methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}



connectDb().then(() => {
  console.log('MongoDb connected');
  initData();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('ALAYON API');
});

//ROuters 
// app.use('/api/admin', AdminRoute);
// app.use('/api/auth', AuthRoute);
// app.use('/api/alyn', AlayonRoute);
// app.use('/api/noapp', NoAppRoute);
// require('./app/routes/alayon.routes')(app);
// require('./app/routes/noapp.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/store.routes')(app);
require('./app/routes/location.routes')(app);

const solverer = () => {
  let error = {};

  error.password = 'Incorrect Password';
  error.name = 'Invalid Name';
  error.password = 'Invalid Char';


    let errors = ['Invalid name', 'Incorrect Password', 'must be 15 char'];
  let ans = error.name;


  //Find Password Error;
  console.log(error)


}

solverer();

app.listen(process.env.PORT || PORT, function() {
  console.log(`Listening on ${PORT}`);
});
