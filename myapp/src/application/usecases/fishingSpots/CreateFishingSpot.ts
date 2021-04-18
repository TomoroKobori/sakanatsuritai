import { FishingSpot } from '../../../domain/models/FishingSpot'
import { IFishingSpotRepository } from '../../repositories/IFishingSpotRepository'

export class CreateFishingSpot {
  private fishingSpotRepository: IFishingSpotRepository

  constructor(fishingSpotRepository: IFishingSpotRepository) {
    this.fishingSpotRepository = fishingSpotRepository
  }

  execute(name: string) {
    let fishingSpot = new FishingSpot(name)
    return this.fishingSpotRepository.persist(fishingSpot)
  }
}