import { Request, Response, NextFunction } from "express";
import { UserRepository } from '../database/UserRepository'
import { ListUsers } from '../../application/usecases/users/ListUsers'
import { GetUser } from '../../application/usecases/users/getUser'
import { CreateUser } from '../../application/usecases/users/CreateUser'
import { UpdateUser } from '../../application/usecases/users/UpdateUser'
import { DeleteUser } from '../../application/usecases/users/DeleteUser'
import { PrismaClient } from '@prisma/client';

export class UsersController {
  private userRepository: UserRepository

  constructor(prisma: PrismaClient) {
    this.userRepository = new UserRepository(prisma)
  }

  async findUser(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new GetUser(this.userRepository)
    return await useCase.execute(Number(id))
  }

  async findAllUseres(req: Request, res: Response) {
    const useCase = new ListUsers(this.userRepository)
    return await useCase.execute()
  }

  async createUser(req: Request, res: Response) {
    const { last_name, first_name, email, password } = req.body
    const useCase = new CreateUser(this.userRepository)
    return await useCase.execute(last_name, first_name, email, password)
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id
    const { last_name, first_name, email } = req.body
    const useCase = new UpdateUser(this.userRepository)
    return await useCase.execute(Number(id), last_name, first_name, email)
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id
    const useCase = new DeleteUser(this.userRepository)
    return await useCase.execute(Number(id))
  }
}
