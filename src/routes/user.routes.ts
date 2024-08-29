import { UserController } from '@/controllers';
import { authenticate } from '@/middlewares/authentication.middleware';
import { Router } from 'express';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/info', authenticate, userController.findUser);

export { userRoutes };
