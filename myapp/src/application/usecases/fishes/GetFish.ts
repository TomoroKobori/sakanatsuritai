import { IFishRepository } from '../../repositories/IFishRepository'

export class GetFish {
  private taskRepository: IFishRepository

  constructor(taskRepository: IFishRepository) {
    this.taskRepository = taskRepository
  }

  execute(id: number) {
    return this.taskRepository.find(id)
  }
}