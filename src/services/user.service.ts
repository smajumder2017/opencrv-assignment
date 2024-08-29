import { Prisma, PrismaClient } from '@prisma/client';

export class UserService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  create = (user: Prisma.UserCreateInput) => {
    return this.prismaClient.user.create({ data: user });
  };

  findByEmail = (email: string) => {
    return this.prismaClient.user.findUnique({ where: { email } });
  };
}
