// const express = require('express');
import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// index
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await prisma.user.findMany();
  res.render('users/index', {
    users: users
  });
});

// new
router.get('/new', (req: Request, res: Response, next: NextFunction): void => {
  res.render('users/new');
});

// create
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, first_name, last_name } = req.body
  await prisma.user.create({
    data: {
      email,
      first_name,
      last_name
    },
  })
  res.redirect('/users');
});

// edit
router.get('/:id/edit', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render('users/edit', {
      user: user
  });
});

// update
router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
});

// destroy
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect('/users');
});

module.exports = router;