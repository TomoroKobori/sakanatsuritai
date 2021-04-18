import { IFishRepository } from '../../repositories/IFishRepository'

export class GetFish {
  private fishRepository: IFishRepository

  constructor(fishRepository: IFishRepository) {
    this.fishRepository = fishRepository
  }

  execute(id: number) {
    return this.fishRepository.find(id)
  }
}