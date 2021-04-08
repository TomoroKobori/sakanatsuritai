import { Request, Response } from "express";

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
  console.log('せいこう！！')
  res.redirect('/');
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
}