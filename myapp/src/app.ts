
import express from "express";

import compression from "compression";  // compresses requests
import session from "express-session";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import { SESSION_SECRET } from "./util/secrets";

console.log(SESSION_SECRET)

// Controllers (route handlers)
import * as homeController from "./controllers/home";
// const indexRouter = require('./routes/index');
const fishingSpotsRouter = require('./routes/fishingSpots')
const fishesRouter = require('./routes/fishes')
const userRouter = require('./routes/users')

import * as passportConfig from "./config/passport";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET!
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
  req.path !== "/login" &&
  req.path !== "/signup") {
    req.session.returnTo = req.path;
  }
  next();
});

// _dirnameだと/src/srcが取れてしまうので一旦ベタ書きにした
app.use(
  express.static("/src/dist/public", { maxAge: 31557600000 })
);

// routes
app.get("/", homeController.index);
// app.use('/', indexRouter);
app.use('/fishingSpots', fishingSpotsRouter);
app.use('/fishes', fishesRouter);
app.use('/users', userRouter);

export default app;
