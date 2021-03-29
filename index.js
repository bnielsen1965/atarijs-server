
/**
 * ATARI SIO Pins:
 * 3  = Digital Input
 * 4  = Ground
 * 5  = Digital Output
 * 6  = Chassis Ground
 * 7  = Command
 * 10 = +5V / Ready
 */

const Config = require('./config');

const IMAGE_PATH = __dirname + '/public/images/';

// create sio handler on serial port
let sio = require('atarijs-sio')(Config.SerialDevice);
let bodyParser = require('body-parser');
let favicon = require('serve-favicon');
let serveIndex = require('serve-index');
let cookieSession = require('cookie-session');
let express = require('express');


let server = express();



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

try {
  server.use(favicon(__dirname + '/public/favicon.ico'));
}
catch (e) {
  console.log(e);
}



var fs = require('fs');

server.post('/api/getimagelist', function(req, res) {
  var imageFiles = [];
  fs.readdir(IMAGE_PATH, function(error, files) {
    if (files && files.length) {
      files.forEach(function(file) {
        imageFiles.push(file);
      });
    }
    res.json({errors: [error], imageFiles: imageFiles});
  });
});


server.get('/api/getstatus', (req, res) => {
  let status = sio.getStatus();
  res.json({errors: [], status: status});
});

// load disk image
server.post('/api/loadimage', (req, res) => {
  // validate input
  console.log('Load drive ' + req.body.driveNumber + ' with ' + IMAGE_PATH + req.body.imageFilename);
  let errors = sio.loadDrive(req.body.driveNumber - 1, IMAGE_PATH + req.body.imageFilename);
  if (errors && errors.length) return res.json({ errors });
  return res.json({ errors: [], messages: [`Loaded ${req.body.imageFilename} in drive ${req.body.driveNumber}.`], status: sio.getStatus() });
});

// save disk back to image file
server.post('/api/savedriveimage', (req, res) => {
  let imageFilePath = req.body.filename ? IMAGE_PATH + req.body.filename : null;
  sio.saveImage(req.body.driveNumber - 1, imageFilePath);
  res.json({ errors: [], status: sio.getStatus() });
});

// unload a disk image
server.post('/api/ejectdriveimage', (req, res) => {
  sio.unloadImage(req.body.driveNumber - 1);
  res.json({ errors: [], status: sio.getStatus() });
});

// get list of image files
server.get('/api/getimagelist', (req, res) => {
  let errors = [];
  let imageFiles = [];
  let extRegExp = new RegExp(`\.(${Config.ImageExtensions.join('|')})$`, 'i');
  fs.readdir(IMAGE_PATH, (error, files) => {
    if (error) errors.push(error);
    files.sort();
    if (files && files.length) files.forEach(file => {
      if (extRegExp.test(file)) imageFiles.push(file);
      extRegExp.lastIndex = 0;
    });
    res.json({ errors, imageFiles });
  });
});


server.listen(Config.Port);
