import express = require('express');
import { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render("home");
})

router.get("/login", (req: Request, res: Response) => {
  res.render('login');
})

router.post("/login", passport.authenticate('local', { failureRedirect: 'login' }), (req: Request, res: Response) => {
  res.redirect('/');
})

router.post("/logout", (req: Request, res: Response) => {
  req.logout();
  req.session.destroy(() => {
    console.log('セッションリセット')
  });
  res.redirect('/');
})

export default router