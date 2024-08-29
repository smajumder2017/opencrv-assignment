import { Prisma, PrismaClient } from '@prisma/client';

export class VoteService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  create = async (vote: Prisma.VoteUncheckedCreateInput[]) => {
    return this.prismaClient.vote.createMany({
      data: vote,
    });
  };

  delete = (id: string) => {
    return this.prismaClient.vote.delete({ where: { id } });
  };

  getAllVoterByEventId = async (id: string) => {
    return this.prismaClient.vote.findMany({
      where: { eventId: id },
      distinct: 'voterId',
      select: {
        voter: { select: { id: true, name: true } },
      },
    });
  };

  getVotesByVoterId = async (voterId: string) => {
    return this.prismaClient.vote.findMany({
      where: { voterId },
      select: {
        date: true,
        voter: { select: { id: true, name: true } },
      },
    });
  };
}
