import { IFishingSpotRepository } from '../../repositories/IFishingSpotRepository'

export class GetFishingSpot {
  private fishingSpotRepository: IFishingSpotRepository

  constructor(fishingSpotRepository: IFishingSpotRepository) {
    this.fishingSpotRepository = fishingSpotRepository
  }

  execute(id: number) {
    return this.fishingSpotRepository.find(id)
  }
}