import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { eventRoutes } from './event.routes';
import { userRoutes } from './user.routes';

const v1Routes = Router();

v1Routes.use('/v1/auth', authRoutes);
v1Routes.use('/v1/event', eventRoutes);
v1Routes.use('/v1/user', userRoutes);

export { v1Routes };
