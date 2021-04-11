import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";
const LocalStrategy = passportLocal.Strategy;

// 認証後に暗号化
passport.serializeUser((user, done) => {
  done(null, user);
});

// 受け取ったセッションキーを復号
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy({ usernameField: "email" },
  (username: string, password: string, done: any) => {
    if (username !== 'kobori') {
      // error
      return done(null, false);
    } else if (password !== 'tomoro') {
      // error
      return done(null, false);
    } else {
      //success
      return done(null, { username: username, password: password});
    }
  }
));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
