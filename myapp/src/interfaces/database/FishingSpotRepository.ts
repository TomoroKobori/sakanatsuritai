import { FishingSpot } from '../../domain/models/FishingSpot'
import { IFishingSpotRepository } from '../../application/repositories/IFishingSpotRepository'
import { PrismaClient } from '@prisma/client';

export class FishingSpotRepository extends IFishingSpotRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  private convertModel(r: any) {
    const fishingSpot = new FishingSpot(r.name)
    fishingSpot.id = r.id

    return fishingSpot
  }

  async find(id: number): Promise<FishingSpot> {
    const fishingSpot = await this.prisma.fishingSpot.findUnique({
      where: {
        id: Number(id),
      },
    });
    return this.convertModel(fishingSpot)
  }

  async findAll(): Promise<Array<FishingSpot>> {
    const fishingSpotes = await this.prisma.fishingSpot.findMany();
    let results = []
    results = fishingSpotes.map((m: any) => {
      return this.convertModel(m)
    })
    return results
  }

  async persist(fishingSpot: FishingSpot): Promise<FishingSpot> {
    await this.prisma.fishingSpot.create({
      data: {
        name: fishingSpot.name
      },
    })
    // fishingSpot.id = result.insertId
    return fishingSpot
  }

  async merge(fishingSpot: FishingSpot): Promise<FishingSpot> {
    await this.prisma.fishingSpot.update({
      where: { id: fishingSpot.id },
      data: { name: fishingSpot.name }
    });
    return fishingSpot
  }

  async delete(fishingSpot: FishingSpot): Promise<FishingSpot> {
    await this.prisma.fishingSpot.delete({
      where: {
        id: fishingSpot.id,
      },
    });
    return this.convertModel(fishingSpot)
  }
}