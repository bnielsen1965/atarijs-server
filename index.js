// index.js


/**
 * ATARI SIO Pins:
 * 3 = Digital Input
 * 4 = Ground
 * 5 = Digital Output
 *
 * Hardware: Raspberry Pi 3
 * OS: Raspbian Jessie Lite
 * Enable /dev/serial0
 * - Edit /boot/config.txt and add line: enable_uart=1
 * - Edit /boot/cmdline.txt and remove: console=serial0,115200
 * - Disable getty on ttyS0:
 *   - sudo systemctl stop serial-getty@ttyS0.service
 *   - sudo systemctl mask serial-getty@ttyS0.service
 * Resistors are required to adapt the 5V signal on the Atari
 * to the 3.3V signal on the RPi3.
 */

var SERIAL_DEVICE = '/dev/serial0';
var IMAGE_PATH = __dirname + '/public/images/';


// create sio handler on serial port
var sio = require('atarijs-sio')(SERIAL_DEVICE);
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var serveIndex = require('serve-index');
var cookieSession = require('cookie-session');
var express = require('express');


var server = express();


// https redirect
/* Implement later as an option
server.use('/', function(req, res, next) {
  if (httpsServer && !req.secure) {
    res.redirect('https://' + req.hostname + ':' + portSSL + req.originalUrl);
  }
  else {
    next();
  }
});
*/


// parse parameters into body if possible
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());


/* implement cookie for authentication
server.set('trust proxy', 1); // trust first proxy
server.use(cookieSession({
  name: 'nodeadmin',
  secret: 'wtsemoc',
  cookie: {
    httpOnly: true,
    maxAge: 60*60*3*1000 // 3 hours
  }
}));
*/


// enable directory listing if images
server.use('/images', serveIndex(__dirname + '/public/images'));
server.use('/images', express.static(__dirname + '/public/images'));
server.use('/images', function(req, res, next) {
  res.status(404).send("File not found.");
});


// allow some static routes
server.use(express.static(__dirname + '/public')); // may restrict this when implementing authentication
server.use('/img', express.static(__dirname + '/public/img'));
server.use('/js', express.static(__dirname + '/public/js'));
server.use('/css', express.static(__dirname + '/public/css'));
server.use('/fonts', express.static(__dirname + '/public/fonts'));
server.use('/node_modules', express.static(__dirname + '/public/node_modules'));
try {
  server.use(favicon(__dirname + '/public/favicon.ico'));
}
catch (e) {
  console.log(e);
}


server.post('/api/loadimage', function(req, res) {
  // validate input
  console.log('Load drive ' + req.body.driveNumber + ' with ' + IMAGE_PATH + req.body.imageFilename);

  sio.loadDrive(req.body.driveNumber - 1, IMAGE_PATH + req.body.imageFilename);
  // read image listload

  // respond with list in json data
  res.json({errors: []});
});


server.listen(8080);
