var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require('./routes/index');
var userRoutes = require('./routes/user');
var expressHbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var passport = require('passport');
var validator = require('express-validator');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var Insta = require('instamojo-nodejs');


// App Initialization
var app = express();

// Mongodb Connection
const config = require('./config/config');
mongoose.connect(config.database, { useNewUrlParser: true });
// Succssfull connection
mongoose.connection.on('connected', () => {
  console.log("Connected to database" + config.database);
});
// On connection failure
mongoose.connection.on('error', (err) => {
  console.log("Connection to database is fialed" + config.database);
});

// Passport Stategy
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(validator());

app.use(cookieParser());

// Session Middleware
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
// Session Middleware


// Flash Session
app.use(flash());
// Flash Session
// Passport
app.use(passport.initialize());
app.use(passport.session());
// Passport
app.use(express.static(path.join(__dirname, 'public')));
// Routes Import

app.use((req, res, next) => {
  // Accessing sessions
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', userRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
