var express = require('express');
var mysql=require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const index = require('./routes/index');
const activity = require('./routes/activity')
const project = require('./routes/project')
const users = require('./routes/users');
const label = require('./routes/label');
const task = require('./routes/task');
const workdays = require('./routes/workdays')
const event = require('./routes/event')
const statsTasks = require('./routes/statsTasks')
const statsProjects = require('./routes/statsProjects')
const statsActivities = require('./routes/statsActivities')
const statsCsv = require('./routes/statsCsv')
const advancement = require('./routes/advancement')

const cors = require('cors');

const executeQuery=require('./services/executeQuery.js')
var app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

const tokenMiddleware = (req, res, next) => {
  
  if (req.path === '/') {
    next()
    return;
  }

  const token = req.get('X-AUTH-TOKEN')
  //console.log('token', token)
  if (!token) {
    // res.status(401)
    // res.end()
    next()
    return;
  }
  try {
    const user = jwt.verify(token, 'monsupermotdepasseincracable');
      
    console.log('user', user)
    if (!user) {
      res.status(401)
      res.end()
      return;
    }

    req.user = user
  } catch(e) {
    console.log('error', e)
  }
  next()
  
}

app.use(tokenMiddleware)

//-------------------------------Appel des ressources
//Appel de index.js
app.use('/', index)
app.use('/', activity)
app.use('/', project)
app.use('/', label)
app.use('/', users)
app.use('/', task)
app.use('/', workdays)
app.use('/', event)
app.use('/', statsTasks)
app.use('/', statsProjects)
app.use('/', statsCsv)
app.use('/', statsActivities)
app.use('/', advancement)
app.use('/', workdays)
//app.use('/users', users);
//-------------------------------Appel des ressources

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));;

//LIGNE DE CODE POUR LE BUILD
//app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
