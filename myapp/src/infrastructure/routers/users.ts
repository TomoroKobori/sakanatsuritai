import express = require('express');
import { Request, Response } from "express";
import { UsersController } from '../../interfaces/controllers/UsersController'
import { PrismaClient } from '@prisma/client';
import * as passportConfig from "../config/passport";

const prisma = new PrismaClient();
const usersController = new UsersController(prisma)
const router = express.Router();

router.get('/', passportConfig.isAuthenticated, async (req: Request, res: Response) => {
  const users = await usersController.findAllUsers(req, res)
  res.render('users/index', {
    users: users
  });
})

router.get('/new', (req: Request, res: Response) => {
  res.render('users/new');
})

router.post('/', async (req: Request, res: Response) => {
  await usersController.createUser(req, res)
  res.redirect('/users');
})

router.get("/:id/edit", async (req: Request, res: Response) => {
  const user = await usersController.findUser(req, res)
  res.render('users/edit', {
    user: user
  });
})

router.put("/:id", async (req: Request, res: Response) => {
  await usersController.updateUser(req, res)
  res.redirect('/users');
})

router.delete("/:id", async (req: Request, res: Response) => {
  await usersController.deleteUser(req, res)
  res.redirect('/users');
})

export default router;
