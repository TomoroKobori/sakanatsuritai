import { FishingSpot } from '../../domain/models/FishingSpot'

export abstract class IFishingSpotRepository {
  abstract findAll(): Promise<Array<FishingSpot>>
  abstract find(id: number): Promise<FishingSpot>
  abstract persist(fish: FishingSpot): Promise<FishingSpot>
  abstract merge(fish: FishingSpot): Promise<FishingSpot>
  abstract delete(fish: FishingSpot): Promise<FishingSpot>
}