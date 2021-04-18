import { IFishRepository } from '../../repositories/IFishRepository'

export class DeleteFish {
  private fishRepository: IFishRepository

  constructor(fishRepository: IFishRepository) {
    this.fishRepository = fishRepository
  }

  async execute(id: number) {
    let fish = await this.fishRepository.find(id)
    return this.fishRepository.delete(fish)
  }
}