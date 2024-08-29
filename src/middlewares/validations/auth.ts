import { EnhancedResponse } from '@/interfaces/responseHandler';
import { NextFunction, Request } from 'express';
import Joi from 'joi';

const registerSchema = Joi.object<IUserCreate>({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(100).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const validateRegistrationPayload = async (
  req: Request<{}, {}, IUserCreate>,
  res: EnhancedResponse,
  next: NextFunction
) => {
  try {
    await registerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.error(
      'Bad Request',
      400,
      error.details.map((err) => err.message)
    );
  }
};

const loginSchema = Joi.object<IUserCreate>({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const validateLoginPayload = async (
  req: Request<{}, {}, IUserCreate>,
  res: EnhancedResponse,
  next: NextFunction
) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.error(
      'Bad Request',
      400,
      error.details.map((err) => err.message)
    );
  }
};
