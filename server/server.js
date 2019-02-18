var express = require('express');
var morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cors = require('cors');

let PORT = process.env.PORT || 3001;
/**
 * Controller
*/
var authCtrl = require('./apiController/authController');

// Declaring express app
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

//Applying controllers
app.use('/api/auth', authCtrl);

app.listen(PORT, () => {
  console.log(`[GO-LeavingForm] Express server is running on port ${PORT}...`)
});