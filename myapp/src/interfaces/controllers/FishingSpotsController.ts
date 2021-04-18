import { Request, Response, NextFunction } from "express";
import { FishingSpotRepository } from '../database/FishingSpotRepository'
import { ListFishingSpots } from '../../application/usecases/fishingSpots/ListFishingSpots'
import { GetFishingSpot } from '../../application/usecases/fishingSpots/getFishingSpot'
import { CreateFishingSpot } from '../../application/usecases/fishingSpots/CreateFishingSpot'
import { UpdateFishingSpot } from '../../application/usecases/fishingSpots/UpdateFishingSpot'
import { DeleteFishingSpot } from '../../application/usecases/fishingSpots/DeleteFishingSpot'
import { PrismaClient } from '@prisma/client';

export class FishingSpotsController {
  private fishingSpotRepository: FishingSpotRepository

  constructor(prisma: PrismaClient) {
    this.fishingSpotRepository = new FishRepository(prisma)
  }

  async findFish(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new GetFish(this.fishingSpotRepository)
    return await useCase.execute(Number(id))
  }

  async findAllFishes(req: Request, res: Response) {
    const useCase = new ListFishes(this.fishingSpotRepository)
    return await useCase.execute()
  }

  async createFish(req: Request, res: Response) {
    const { name } = req.body
    const useCase = new CreateFish(this.fishingSpotRepository)
    return await useCase.execute(name)
  }

  async updateFish(req: Request, res: Response) {
    const id = req.params.id
    const { name } = req.body
    const useCase = new UpdateFish(this.fishingSpotRepository)
    return await useCase.execute(Number(id), name)
  }

  async deleteFish(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new DeleteFish(this.fishingSpotRepository)
    return await useCase.execute(Number(id))
  }
}
