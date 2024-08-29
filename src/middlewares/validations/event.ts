import { EnhancedResponse } from '@/interfaces/responseHandler';
import { NextFunction, Request } from 'express';
import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate) as typeof JoiBase;

const eventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  dates: Joi.array().items(
    Joi.string()
    // Joi.date().format('YYYY-MM-DD').required().raw()
  ),
});

export const validateCreateEventPayload = async (
  req: Request<{}, {}, IUserCreate>,
  res: EnhancedResponse,
  next: NextFunction
) => {
  try {
    const event = await eventSchema.validateAsync(req.body);
    console.log(event);
    next();
  } catch (error) {
    res.error(
      'Bad Request',
      400,
      error.details.map((err) => err.message)
    );
  }
};
