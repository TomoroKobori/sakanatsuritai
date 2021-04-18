import { Fish } from '../../../domain/models/Fish'
import { IFishRepository } from '../../repositories/IFishRepository'

export class CreateFish {
  private fishRepository: IFishRepository

  constructor(fishRepository: IFishRepository) {
    this.fishRepository = fishRepository
  }

  execute(name: string) {
    let fish = new Fish(name)
    return this.fishRepository.persist(fish)
  }
}