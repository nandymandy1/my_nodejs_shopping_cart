const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/categories');

const expressHbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const Insta = require('instamojo-nodejs');
// Bring in cors moudule
const cors = require('cors');


// App Initialization
const app = express();

// Mongodb Connection
const config = require('./config/config');

mongoose.connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database" + config.database);
  })
  .catch((err) => {
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

// Cors middlewares
app.use(cors());


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
app.use('/categories', categoryRoutes);
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
