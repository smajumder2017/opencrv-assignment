import { Prisma, PrismaClient } from '@prisma/client';

export class EventService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  create = async (event: Omit<Prisma.EventUncheckedCreateInput, 'eventId'>) => {
    const eventCount = await this.prismaClient.event.count();
    return this.prismaClient.event.create({
      data: { ...event, eventId: eventCount },
    });
  };

  findAll = (args: Prisma.EventFindManyArgs) => {
    return this.prismaClient.event.findMany(args);
  };

  findEventByEventId = (eventId: number) => {
    return this.prismaClient.event.findUnique({
      where: { eventId },
      include: {
        votes: {
          select: { date: true, voter: { select: { name: true } } },
        },
      },
    });
  };
}
