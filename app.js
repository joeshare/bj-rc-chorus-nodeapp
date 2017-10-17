var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routesConfig = require('./config/routeConfig');
var sessionConfig = require('./config/sessionConfig');
var allowOriginUse = require('./config/allowOriginConfig');
var operationConfig = require('./config/operationConfig');
var rsaconfig = require('./config/rsaConfig');
const CONSTANT= require('./config/constant');
var app = express();
var loggerHelper = require("./utils/loggerHelper.js");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, CONSTANT.resourcePath, 'images','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session config
sessionConfig(app);
//operation config
operationConfig(app);
rsaconfig.init(app);

app.use(express.static(path.join(__dirname, CONSTANT.resourcePath)));
//allow-Origin
app.use(allowOriginUse);


//routes config
routesConfig(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//notFoundConfig(app);
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("=========|||||||||========")
    if(err){
      loggerHelper.logError(err)
      console.log(err)
      res.render('error', {
        message: err.message,
        error: err
      });
    }

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log("=================")
  if(err){
    loggerHelper.logError(err)
    console.log(err)
    res.render('error', {
      message: err.message,
      error: err
    });
  }
});


module.exports = app;
