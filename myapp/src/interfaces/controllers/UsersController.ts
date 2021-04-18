import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt-nodejs');
const prisma = new PrismaClient();

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await prisma.user.findMany();
  res.render('users/index', {
    users: users
  });
};

export const newUser = (req: Request, res: Response, next: NextFunction): void => {
  res.render('users/new');
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, first_name, last_name } = req.body
  const password = bcrypt.hashSync(req.body.password)
  await prisma.user.create({
    data: {
      email,
      first_name,
      last_name,
      password
    },
  })
  res.redirect('/users');
};

export const editUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render('users/edit', {
      user: user
  });
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { email, first_name, last_name } = req.body
  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      email: email,
      first_name: first_name,
      last_name: last_name
     }
  });
  res.redirect('/users');
};

export const destroyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect('/users');
};
