import { User } from '../../domain/models/User'
import { IUserRepository } from '../../application/repositories/IUserRepository'
import { PrismaClient } from '@prisma/client';

export class UserRepository extends IUserRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    super()
    this.prisma = prisma
  }

  private convertModel(r: any) {
    const user = new User(r.last_name, r.first_name, r.email, r.password)
    user.id = r.id

    return user
  }

  async find(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return this.convertModel(user)
  }

  async findAll(): Promise<Array<User>> {
    const useres = await this.prisma.user.findMany();
    let results = []
    results = useres.map((m: any) => {
      return this.convertModel(m)
    })
    return results
  }

  async persist(user: User): Promise<User> {
    await this.prisma.user.create({
      data: {
        last_name: user.last_name,
        first_name: user.first_name,
        email: user.email,
        password: user.password
      },
    })
    // user.id = result.insertId
    return user
  }

  async merge(user: User): Promise<User> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        last_name: user.last_name,
        first_name: user.first_name,
        email: user.email
      }
    });
    return user
  }

  async delete(user: User): Promise<User> {
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return this.convertModel(user)
  }
}