import { EnhancedResponse } from '@/interfaces/responseHandler';
import { AuthService } from '@/services';
import { NextFunction, Request } from 'express';

export const authenticate = async (
  req: Request<{}, {}>,
  res: EnhancedResponse,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.error('Authorization header not present', 400);
      return;
    }
    const token = authHeader.split(' ')?.[1];
    if (!token) {
      res.error('Bearer token not present', 400);
      return;
    }
    const authService = new AuthService();
    const decoded = authService.verifyAccessToken(token) as IAuthTokenPayload;

    if (!decoded) {
      res.error('token not valid', 400);
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.error(error.message, 500);
  }
};
