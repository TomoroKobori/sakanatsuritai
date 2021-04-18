import { User } from '../../domain/models/User'

export abstract class IUserRepository {
  abstract findAll(): Promise<Array<User>>
  abstract find(id: number): Promise<User>
  abstract persist(fish: User): Promise<User>
  abstract merge(fish: User): Promise<User>
  abstract delete(fish: User): Promise<User>
}