var express = require('express');
var morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cors = require('cors');

let PORT = process.env.PORT || 3001;
/**
 * Controller
*/
let authCtrl = require('./apiController/authController');
let userCtrl = require('./apiController/userController');
let leaveLetterCtrl = require('./apiController/leaveLetterController');

/**
 * Middlewares
 */
let {verifyAccessToken} = require('./repo/refTokenRepo');

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
app.use('/api/user', verifyAccessToken, userCtrl);
app.use('/api/leaveLetter', leaveLetterCtrl); //temporary disable verifyAccessToken

app.listen(PORT, () => {
  console.log(`[GO-LeavingForm] Express server is running on port ${PORT}...`)
});