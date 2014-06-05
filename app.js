var express = require('express'),
  url = require('url'),
  http = require('http'),
  path = require('path'),
  proxy = require('proxy-middleware');

var app = module.exports = express();

app.set('port', process.env.PORT || 8000);
app.use(express.logger('dev'));
app.use('/proxy', proxy('http://url'));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'dist')));

// redirect all others to the public/index.html (HTML5 history)
app.get(/^(.*)$/, function(req, res, next){
  res.sendfile(path.join(__dirname, 'dist/index.html'));
});

var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
