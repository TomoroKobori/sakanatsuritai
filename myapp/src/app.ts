
import express, { NextFunction } from "express";

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

import * as homeController from "./controllers/home";
import * as fishesController from "./controllers/fishes";
import * as fishingSpotsController from "./controllers/fishingSpots";
import * as usersController from "./controllers/users";

import * as passportConfig from "./config/passport";

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
app.get("/", homeController.index);
app.get("/login", homeController.newLogin);
app.post("/login", passport.authenticate('local', { failureRedirect: 'login' }), homeController.createLogin);
app.post("/logout", homeController.logout);
app.get("/fishes", fishesController.index);
app.get("/fishes/new", fishesController.newFish);
app.post("/fishes", fishesController.createFish);
app.get("/fishes/:id/edit", fishesController.editFish);
app.put("/fishes/:id", fishesController.updateFish);
app.delete("/fishes/:id", fishesController.destroyFish);
app.get("/fishingSpots", fishingSpotsController.index);
app.get("/fishingSpots/new", fishingSpotsController.newFishingSpot);
app.post("/fishingSpots", fishingSpotsController.createFishingSpot);
app.get("/fishingSpots/:id/edit", fishingSpotsController.editFishingSpot);
app.put("/fishingSpots/:id", fishingSpotsController.updateFishingSpot);
app.delete("/fishingSpots/:id", fishingSpotsController.destroyFishingSpot);
app.get("/users", passportConfig.isAuthenticated, usersController.index);
app.get("/users/new", usersController.newUser);
app.post("/users", usersController.createUser);
app.get("/users/:id/edit", usersController.editUser);
app.put("/users/:id", usersController.updateUser);
app.delete("/users/:id", usersController.destroyUser);


export default app;
