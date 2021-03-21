// const express = require('express');
import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
import passport from "passport";

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.render('index');
});

router.get('/login', (req: Request, res: Response): void => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login");
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  session: true
}));

router.get('/logout', (req: Request, res: Response): void => {
  req.logout();
  res.redirect('/');
});
  
module.exports = router;
