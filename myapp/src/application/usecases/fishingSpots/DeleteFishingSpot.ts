import { IFishingSpotRepository } from '../../repositories/IFishingSpotRepository'

export class DeleteFishingSpot {
  private fishingSpotRepository: IFishingSpotRepository

  constructor(fishingSpotRepository: IFishingSpotRepository) {
    this.fishingSpotRepository = fishingSpotRepository
  }

  async execute(id: number) {
    let fishingSpot = await this.fishingSpotRepository.find(id)
    return this.fishingSpotRepository.delete(fishingSpot)
  }
}