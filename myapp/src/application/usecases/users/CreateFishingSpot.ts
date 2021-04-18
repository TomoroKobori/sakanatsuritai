import { User } from '../../../domain/models/User'
import { IUserRepository } from '../../repositories/IUserRepository'

export class CreateUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  execute(last_name: string, first_name: string, email: string, password: string) {
    let user = new User(last_name, first_name, email, password)
    return this.userRepository.persist(user)
  }
}