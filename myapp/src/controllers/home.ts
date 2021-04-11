import { Request, Response } from "express";
import "../config/passport";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  res.render("home");
};

export const newLogin = (req: Request, res: Response) => {
  res.render('login');
};

export const createLogin = (req: Request, res: Response) => {
  res.redirect('/');
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  req.session.destroy(() => {
    console.log('セッションリセット')
  });
  res.redirect('/');
}