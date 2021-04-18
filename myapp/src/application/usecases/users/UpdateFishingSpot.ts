import { IUserRepository } from '../../repositories/IUserRepository'

export class UpdateUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(id: number, last_name: string, first_name: string, email: string, password: string) {
    let user = await this.userRepository.find(id)
    user.last_name = last_name
    user.first_name = first_name
    user.email = email
    user.password = password
    return this.userRepository.merge(user)
  }
}