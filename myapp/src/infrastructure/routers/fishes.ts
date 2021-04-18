import express = require('express');
import { Request, Response } from "express";
import { FishesController } from '../../interfaces/controllers/FishesController'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const fishesController = new FishesController(prisma)
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const fishes = await fishesController.findAllFishes(req, res)
  res.render('fishes/index', {
    fishes: fishes
  });
})

router.get('/new', (req: Request, res: Response) => {
  res.render('fishes/new');
})

router.post('/', async (req: Request, res: Response) => {
  await fishesController.createFish(req, res)
  res.redirect('/fishes');
})

router.get("/:id/edit", async (req: Request, res: Response) => {
  const fish = await fishesController.findFish(req, res)
  res.render('fishes/edit', {
    fish: fish
  });
})

router.put("/:id", async (req: Request, res: Response) => {
  await fishesController.updateFish(req, res)
  res.redirect('/fishes');
})

router.delete("/:id", async (req: Request, res: Response) => {
  await fishesController.deleteFish(req, res)
  res.redirect('/fishes');
})

export default router;