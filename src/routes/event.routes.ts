import { EventController } from '@/controllers';
import { authenticate } from '@/middlewares/authentication.middleware';
import { validateCreateEventPayload } from '@/middlewares/validations/event';

import { Router } from 'express';

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.post(
  '/',
  authenticate,
  validateCreateEventPayload,
  eventController.createEvent
);
eventRoutes.get('/list', authenticate, eventController.findAllEvents);
eventRoutes.get('/:id', authenticate, eventController.findEventById);
eventRoutes.post('/:id/vote', authenticate, eventController.addVote);
eventRoutes.get(
  '/:id/results',
  authenticate,
  eventController.findSuitableDates
);

export { eventRoutes };
