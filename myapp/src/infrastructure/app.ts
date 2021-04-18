
import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import logger from "morgan";
import { SESSION_SECRET } from "./util/secrets";
import passport from "passport";

import fishesRouter from './routers/fishes';
import fishingSpotsRouter from './routers/fishingSpots';
import homeRouter from './routers/home';
import usersRouter from './routers/users';

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// secure属性は環境変数で切り替えたい
app.use(session({
  secret: SESSION_SECRET,
  cookie: {
    sameSite: true,
    secure: process.env.COOKIE_SECURE === 'true'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// _dirnameだと/src/srcが取れてしまうので一旦ベタ書きにした
app.use(express.static("/src/dist/public", { maxAge: 31557600000 }));

// ログインユーザを取得
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
app.use('/fishes', fishesRouter)
app.use('/fishingSpots', fishingSpotsRouter)
app.use('/home', homeRouter)
app.use('/users', usersRouter)

export default app;
