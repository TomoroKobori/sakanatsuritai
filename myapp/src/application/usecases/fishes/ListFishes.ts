import { IFishRepository } from '../../repositories/IFishRepository'

export class ListFishes {
  private fishRepository: IFishRepository

  constructor(fishRepository: IFishRepository) {
    this.fishRepository = fishRepository
  }

  execute() {
    return this.fishRepository.findAll()
  }
}