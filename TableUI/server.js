var express = require('express'),
  path = require('path');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use('/', express.static(__dirname + '/src'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/lib',express.static(__dirname + '/lib'));
app.use('/fonts',express.static(__dirname + '/fonts'));

var _this = this;
this.backgrounds = false;
app.get('/', function(req, res, next) {
  if(_this.backgrounds)
    res.sendFile(path.join(__dirname+'/index.html'));
  else
    res.sendFile(path.join(__dirname+'/loading.html'));
});
require('child_process').exec('cmd /c launch_backgrounds.bat', function(){
  // when both backgrounds have been started
  _this.backgrounds = true;
  console.log('Background processes launched.');
});

// in case of background launch didn't respond after 2 seconds
setTimeout(function() {
  _this.backgrounds = true;
}, 2000);

// launch the TableUI http server on given port
app.listen(8000);

console.log('Waiting for background processes.');



