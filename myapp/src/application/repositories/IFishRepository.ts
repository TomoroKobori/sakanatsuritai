import { Fish } from '../../domain/models/Fish'

export abstract class IFishRepository {
  abstract findAll(): Promise<Array<Fish>>
  abstract find(id: number): Promise<Fish>
  abstract persist(fish: Fish): Promise<Fish>
  abstract merge(fish: Fish): Promise<Fish>
  abstract delete(fish: Fish): Promise<Fish>
}