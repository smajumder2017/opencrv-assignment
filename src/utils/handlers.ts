import { EnhancedResponse } from '@/interfaces/responseHandler';
import { Request, NextFunction } from 'express';

export const responseHandler = (
  req: Request,
  res: EnhancedResponse,
  next: NextFunction
) => {
  res.success = (data, statusCode = 200) => {
    res.status(statusCode).json(data);
  };

  res.error = (message = 'Error', statusCode = 500, reason?: string[]) => {
    res.status(statusCode).json({
      message: message,
      reason,
    });
  };

  next();
};
