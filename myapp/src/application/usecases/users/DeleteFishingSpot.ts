import { IUserRepository } from '../../repositories/IUserRepository'

export class DeleteUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(id: number) {
    let user = await this.userRepository.find(id)
    return this.userRepository.delete(user)
  }
}