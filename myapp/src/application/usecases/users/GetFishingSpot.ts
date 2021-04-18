import { IUserRepository } from '../../repositories/IUserRepository'

export class GetUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  execute(id: number) {
    return this.userRepository.find(id)
  }
}