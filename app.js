var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
<<<<<<< HEAD
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test')//dk
=======
require("dotenv").config();
var mongodbUri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.whee5.mongodb.net/test?authSource=admin&replicaSet=atlas-fbaqqf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
var apiRouter = require('./routes/api/index');
>>>>>>> 94c87ba938237029f3b20c935049a03ecfa36439
const mongoose = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/users', usersRouter);
app.use('/test',testRouter);//dk
=======
app.use('/api', apiRouter);

>>>>>>> 94c87ba938237029f3b20c935049a03ecfa36439

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