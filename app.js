var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const passportConfig = require('./passport');




var indexRouter = require('./routes/index');
require("dotenv").config();
var mongodbUri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.whee5.mongodb.net/test?authSource=admin&replicaSet=atlas-fbaqqf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
var apiRouter = require('./routes/api/index');
const mongoose = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize());
passportConfig();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const root=path.join(__dirname, '..','client','build')
app.use(express.static(root));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api', apiRouter);

  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Connect to MONGODB SERVER
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});
module.exports = app;