import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fishes = await prisma.fish.findMany();
  res.render('fishes/index', {
    fishes: fishes
  });
}

export const newFish = (req: Request, res: Response, next: NextFunction): void => {
  res.render('fishes/new');
};

export const createFish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body
  await prisma.fish.create({
    data: {
      name
    },
  })
  res.redirect('/fishes');
};

export const editFish =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const fish = await prisma.fish.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render('fishes/edit', {
      fish: fish
  });
};

export const updateFish =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { name } = req.body
  await prisma.fish.update({
    where: { id: Number(id) },
    data: { name: name }
  });
  res.redirect('/fishes');
};

export const destroyFish =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  await prisma.fish.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect('/fishes');
};
