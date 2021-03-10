const createError = require('http-errors');
// const express = require('express');
import express from "express";
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

const methodOverride = require("method-override");
const indexRouter = require('./routes/index');
// const fishingspotsRouter = require('../routes/fishingspots')
// const fishesRouter = require('../routes/fishes')

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

app.use('/', indexRouter);
// app.use('/fishingspots', fishingspotsRouter);
// app.use('/fishes', fishesRouter);

// catch 404 and forward to error handler
app.use((req, res, next): void => {
  next(createError(404));
});

// error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('えらー')
  // render the error page
  res.status(500);
  res.render('views/error');
});

module.exports = app;
