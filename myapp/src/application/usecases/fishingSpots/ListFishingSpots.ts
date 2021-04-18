import { IFishingSpotRepository } from '../../repositories/IFishingSpotRepository'

export class ListFishingSpots {
  private fishingSpotRepository: IFishingSpotRepository

  constructor(fishingSpotRepository: IFishingSpotRepository) {
    this.fishingSpotRepository = fishingSpotRepository
  }

  execute() {
    return this.fishingSpotRepository.findAll()
  }
}