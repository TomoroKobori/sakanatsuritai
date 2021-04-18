import { Request, Response, NextFunction } from "express";
import { FishRepository } from '../database/FishRepository'
import { ListFishes } from '../../application/usecases/fishes/ListFishes'
import { GetFish } from '../../application/usecases/fishes/GetFish'
import { CreateFish } from '../../application/usecases/fishes/CreateFish'
import { UpdateFish } from '../../application/usecases/fishes/UpdateFish'
import { DeleteFish } from '../../application/usecases/fishes/DeleteFish'
import { PrismaClient } from '@prisma/client';

export class FishesController {
  private fishRepository: FishRepository

  constructor(prisma: PrismaClient) {
    this.fishRepository = new FishRepository(prisma)
  }

  async findFish(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new GetFish(this.fishRepository)
    return await useCase.execute(Number(id))
  }

  async findAllFishes(req: Request, res: Response) {
    const useCase = new ListFishes(this.fishRepository)
    return await useCase.execute()
  }

  async createFish(req: Request, res: Response) {
    const { name } = req.body
    const useCase = new CreateFish(this.fishRepository)
    return await useCase.execute(name)
  }

  async updateFish(req: Request, res: Response) {
    const id = req.params.id
    const { name } = req.body
    const useCase = new UpdateFish(this.fishRepository)
    return await useCase.execute(Number(id), name)
  }

  async deleteFish(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new DeleteFish(this.fishRepository)
    return await useCase.execute(Number(id))
  }
}
