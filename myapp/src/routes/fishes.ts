// const express = require('express');
import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// index
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fishes = await prisma.fish.findMany();
  res.render('fishes/index', {
    fishes: fishes
  });
});

// new
router.get('/new', (req: Request, res: Response, next: NextFunction): void => {
  res.render('fishes/new');
});

// create
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body
  await prisma.fish.create({
    data: {
      name
    },
  })
  res.redirect('/fishes');
});

// edit
router.get('/:id/edit', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const fish = await prisma.fish.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render('fishes/edit', {
      fish: fish
  });
});

// update
router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { name } = req.body
  await prisma.fish.update({
    where: { id: Number(id) },
    data: { name: name }
  });
  res.redirect('/fishes');
});

// destroy
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  await prisma.fish.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect('/fishes');
});

module.exports = router;