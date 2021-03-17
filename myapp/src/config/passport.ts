import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err: NativeError, user: UserDocument) => {
//         done(err, user.id);
//     });
// });

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  if (email === "test" && password === "test") {
      return done(undefined, email);
  }
  return done(undefined, false, { message: "Invalid email or password." });
}));
