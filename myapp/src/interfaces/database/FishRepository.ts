import { Fish } from '../../domain/models/Fish'
import { IFishRepository } from '../../application/repositories/IFishRepository'
import { PrismaClient } from '@prisma/client';

export class FishRepository extends IFishRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  private convertModel(r: any) {
    const fish = new Fish(r.name)
    fish.id = r.id

    return fish
  }

  async find(id: number): Promise<Fish> {
    const fish = await this.prisma.fish.findUnique({
      where: {
        id: Number(id),
      },
    });
    return this.convertModel(fish)
  }

  async findAll(): Promise<Array<Fish>> {
    const fishes = await this.prisma.fish.findMany();
    let results = []
    results = fishes.map((m: any) => {
      return this.convertModel(m)
    })
    return results
  }

  async persist(fish: Fish): Promise<Fish> {
    await this.prisma.fish.create({
      data: {
        name: fish.name
      },
    })
    return fish
  }

  async merge(fish: Fish): Promise<Fish> {
    await this.prisma.fish.update({
      where: { id: fish.id },
      data: { name: fish.name }
    });
    return fish
  }

  async delete(fish: Fish): Promise<Fish> {
    await this.prisma.fish.delete({
      where: {
        id: fish.id,
      },
    });
    return fish
  }
}