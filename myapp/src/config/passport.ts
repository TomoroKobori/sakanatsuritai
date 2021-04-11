import passport from "passport";
import passportLocal from "passport-local";
const bcrypt = require('bcrypt-nodejs');
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const LocalStrategy = passportLocal.Strategy;
const prisma = new PrismaClient();

// 認証後に暗号化
passport.serializeUser((user, done) => {
  done(null, user);
});

// 受け取ったセッションキーを復号
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy({ usernameField: "email" },
  async (username: string, password: string, done: any) => {
    const user = await prisma.user.findUnique({
      where: {
        email: username,
      },
    });
    if (!user) {
      return done(null, false);
    } else if (!bcrypt.compareSync(password, user.password)) {
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
