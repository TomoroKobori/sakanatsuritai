import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fishingSpots = await prisma.fishingSpot.findMany();
  res.render('fishingSpots/index', {
    fishingSpots: fishingSpots
  });
};

export const newFishingSpot = (req: Request, res: Response, next: NextFunction): void => {
  res.render('fishingSpots/new');
};

export const createFishingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body
  await prisma.fishingSpot.create({
    data: {
      name
    },
  })
  res.redirect('/fishingSpots');
};

export const editFishingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const fishingSpot = await prisma.fishingSpot.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render('fishingSpots/edit', {
    fishingSpot: fishingSpot
  });
};

export const updateFishingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { name } = req.body
  await prisma.fishingSpot.update({
    where: { id: Number(id) },
    data: { name: name }
  });
  res.redirect('/fishingSpots');
};

export const destroyFishingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  await prisma.fishingSpot.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect('/fishingSpots');
};
