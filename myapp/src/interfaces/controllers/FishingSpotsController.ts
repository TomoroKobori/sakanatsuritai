import { Request, Response, NextFunction } from "express";
import { FishingSpotRepository } from '../database/FishingSpotRepository'
import { ListFishingSpots } from '../../application/usecases/fishingSpots/ListFishingSpots'
import { GetFishingSpot } from '../../application/usecases/fishingSpots/GetFishingSpot'
import { CreateFishingSpot } from '../../application/usecases/fishingSpots/CreateFishingSpot'
import { UpdateFishingSpot } from '../../application/usecases/fishingSpots/UpdateFishingSpot'
import { DeleteFishingSpot } from '../../application/usecases/fishingSpots/DeleteFishingSpot'
import { PrismaClient } from '@prisma/client';

export class FishingSpotsController {
  private fishingSpotRepository: FishingSpotRepository

  constructor(prisma: PrismaClient) {
    this.fishingSpotRepository = new FishingSpotRepository(prisma)
  }

  async findFishingSpot(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new GetFishingSpot(this.fishingSpotRepository)
    return await useCase.execute(Number(id))
  }

  async findAllFishingSpots(req: Request, res: Response) {
    const useCase = new ListFishingSpots(this.fishingSpotRepository)
    return await useCase.execute()
  }

  async createFishingSpot(req: Request, res: Response) {
    const { name } = req.body
    const useCase = new CreateFishingSpot(this.fishingSpotRepository)
    return await useCase.execute(name)
  }

  async updateFishingSpot(req: Request, res: Response) {
    const id = req.params.id
    const { name } = req.body
    const useCase = new UpdateFishingSpot(this.fishingSpotRepository)
    return await useCase.execute(Number(id), name)
  }

  async deleteFishingSpot(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new DeleteFishingSpot(this.fishingSpotRepository)
    return await useCase.execute(Number(id))
  }
}
