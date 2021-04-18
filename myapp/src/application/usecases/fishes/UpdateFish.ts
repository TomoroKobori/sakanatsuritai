import { IFishRepository } from '../../repositories/IFishRepository'

export class UpdateFish {
  private fishRepository: IFishRepository

  constructor(fishRepository: IFishRepository) {
    this.fishRepository = fishRepository
  }

  async execute(id: number, name: string) {
    let fish = await this.fishRepository.find(id)
    fish.name = name
    return this.fishRepository.merge(fish)
  }
}