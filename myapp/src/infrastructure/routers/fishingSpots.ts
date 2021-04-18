import express = require('express');
import { Request, Response } from "express";
import { FishingSpotsController } from '../../interfaces/controllers/FishingSpotsController'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const fishingSpotsController = new FishingSpotsController(prisma)
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const fishingSpots = await fishingSpotsController.findAllFishingSpots(req, res)
  res.render('fishingSpots/index', {
    fishingSpots: fishingSpots
  });
})

router.get('/new', (req: Request, res: Response) => {
  res.render('fishingSpots/new');
})

router.post('/', async (req: Request, res: Response) => {
  await fishingSpotsController.createFishingSpot(req, res)
  res.redirect('/fishingSpots');
})

router.get("/:id/edit", async (req: Request, res: Response) => {
  const fishingSpot = await fishingSpotsController.findFishingSpot(req, res)
  res.render('fishingSpots/edit', {
    fishingSpot: fishingSpot
  });
})

router.put("/:id", async (req: Request, res: Response) => {
  await fishingSpotsController.updateFishingSpot(req, res)
  res.redirect('/fishingSpots');
})

router.delete("/:id", async (req: Request, res: Response) => {
  await fishingSpotsController.deleteFishingSpot(req, res)
  res.redirect('/fishingSpots');
})

export default router;