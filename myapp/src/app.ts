const createError = require('http-errors');
import express from "express";
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const methodOverride = require("method-override");
const indexRouter = require('./routes/index');
const fishingSpotsRouter = require('./routes/fishingSpots')
const fishesRouter = require('./routes/fishes')
const userRouter = require('./routes/users')

import * as passportConfig from "./config/passport";

const app = express();

app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 認証設定(passport)
app.use(passport.initialize());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


app.use('/', indexRouter);
app.use('/fishingSpots', fishingSpotsRouter);
app.use('/fishes', fishesRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next): void => {
  next(createError(404));
});

// error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render('error');
});

module.exports = app;
