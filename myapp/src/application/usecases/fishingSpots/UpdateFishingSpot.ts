import { IFishingSpotRepository } from '../../repositories/IFishingSpotRepository'

export class UpdateFishingSpot {
  private fishingSpotRepository: IFishingSpotRepository

  constructor(fishingSpotRepository: IFishingSpotRepository) {
    this.fishingSpotRepository = fishingSpotRepository
  }

  async execute(id: number, name: string) {
    let fishingSpot = await this.fishingSpotRepository.find(id)
    fishingSpot.name = name
    return this.fishingSpotRepository.merge(fishingSpot)
  }
}