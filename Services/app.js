const express = require('express');
const bodyParser = require('body-parser');

const product = require('./api/routes/userRoutes'); // Imports routes for the products
const app = express();
//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
  });

// Set up mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://yogendra:yogendra123@ds159073.mlab.com:59073/products';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});