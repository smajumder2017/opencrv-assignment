import { AuthController } from '@/controllers';
import {
  validateLoginPayload,
  validateRegistrationPayload,
} from '@/middlewares/validations/auth';
import { Router } from 'express';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  '/register',
  validateRegistrationPayload,
  authController.register
);
authRoutes.post('/login', validateLoginPayload, authController.login);

export { authRoutes };
