import { Request } from 'express';

import { EnhancedResponse } from '@/interfaces/responseHandler';
import { EventService, VoteService } from '@/services';
import { Prisma } from '@prisma/client';

interface IRawEventResponse {
  id: string;
  eventId: number;
  name: string;
  authorId: string;
  dates: string[];
  votes: {
    date: string;
    voter: {
      name: string;
    };
  }[];
}

export class EventController {
  private eventService: EventService;
  private voteService: VoteService;
  constructor() {
    this.eventService = new EventService();
    this.voteService = new VoteService();
  }

  formatEventResponse = (data: IRawEventResponse) => {
    const { votes } = data;
    const result = votes.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = [curr.voter.name];
      } else {
        acc[curr.date].push(curr.voter.name);
      }

      return acc;
    }, {});
    const event = {
      ...data,
      votes: Object.keys(result).map((date) => ({
        date,
        people: result[date],
      })),
    };
    const response = { ...event, id: event.eventId };

    delete response.authorId;
    delete response.eventId;

    return response;
  };

  createEvent = async (
    req: Request<{}, {}, IEventCreate>,
    res: EnhancedResponse
  ) => {
    try {
      const event = await this.eventService.create({
        ...req.body,
        authorId: req.user.id,
      });

      res.send({ id: event.eventId });
    } catch (error) {
      res.error(error.message, 500);
    }
  };

  findAllEvents = async (req: Request<{}, {}>, res: EnhancedResponse) => {
    try {
      const events = await this.eventService.findAll({
        select: { eventId: true, name: true },
      });

      res.success({
        events: events.map((event) => {
          let id = event.eventId;
          delete event.eventId;
          return { ...event, id };
        }),
      });
    } catch (error) {
      res.error(error.message, 500);
    }
  };

  findEventById = async (
    req: Request<{ id: string }, {}>,
    res: EnhancedResponse
  ) => {
    try {
      const eventId = req.params.id;
      const event = await this.eventService.findEventByEventId(
        parseInt(eventId)
      );
      const response = this.formatEventResponse(event);

      res.success(response);
    } catch (error) {
      res.error(error.message, 500);
    }
  };

  addVote = async (
    req: Request<{ id: string }, {}, ICreateVote>,
    res: EnhancedResponse
  ) => {
    try {
      const voter = req.user;
      const dates = req.body.votes;
      const eventId = parseInt(req.params.id);
      const event = await this.eventService.findEventByEventId(eventId);
      const validDate = dates.every((date) => event.dates.includes(date));
      if (!validDate) {
        res.error('Entered date not belongs to this event', 400);
        return;
      }
      // handle duplicate votes
      const existingVotes = (
        await this.voteService.getVotesByVoterId(voter.id)
      ).map((vote) => vote.date);
      const validVotes = dates.filter((date) => !existingVotes.includes(date));

      const payload: Prisma.VoteCreateManyInput[] = validVotes.map((date) => ({
        date,
        voterId: voter.id,
        eventId: event.id,
      }));
      if (payload.length) {
        await this.voteService.create(payload);
      }

      const updatedEvent = await this.eventService.findEventByEventId(eventId);
      const response = this.formatEventResponse(updatedEvent);
      res.success(response);
    } catch (error) {
      res.error(error.message, 500);
    }
  };

  findSuitableDates = async (
    req: Request<{ id: string }, {}, ICreateVote>,
    res: EnhancedResponse
  ) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await this.eventService.findEventByEventId(eventId);
      const voters = await this.voteService.getAllVoterByEventId(event.id);
      const formattedEvent = this.formatEventResponse(event);
      const suitableDates = formattedEvent.votes.filter(
        (vote) => vote.people.length === voters.length
      );
      delete formattedEvent.votes;
      delete formattedEvent.dates;
      res.success({ ...formattedEvent, suitableDates });
    } catch (error) {
      res.error(error.message, 500);
    }
  };
}
