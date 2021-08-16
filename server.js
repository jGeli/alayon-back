const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDb = require('./app/connection');
const cors = require('cors');

const PORT = 42000;

var corsOptions = {
  origin: ['http://localhost:42030'],
  // methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}

connectDb().then(() => {
  console.log('MongoDb connected');
});




app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  res.send('Hello World!');
});

//ROuters 
const AdminRoute = require('./app/routes/admin.routes');
const AlayonRoute = require('./app/routes/alayon.routes');
const NoAppRoute = require('./app/routes/noapp.routes');

app.use('/api/admin', AdminRoute);
app.use('/api/alyn', AlayonRoute);
app.use('/api/noapp', NoAppRoute);
// require('./app/routes/alayon.routes')(app);
require('./app/routes/noapp.routes')(app);
require('./app/routes/alayon.routes')(app);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
