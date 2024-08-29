import jwt from 'jsonwebtoken';
import config from '@/config';

export class AuthService {
  constructor() {}

  generateAccessToken = (data: IAuthTokenPayload) => {
    return jwt.sign(data, config.SECRETS.ACCESS_TOKEN_SECRET, {
      expiresIn: config.SECRETS.ACCESS_TOKEN_EXPIRES,
    });
  };

  generateRefreshToken = (data: IAuthTokenPayload) => {
    return jwt.sign(data, config.SECRETS.REFRESH_TOKEN_SECRET, {
      expiresIn: config.SECRETS.REFRESH_TOKEN_EXPIRES,
    });
  };

  verifyAccessToken = (token: string) => {
    return jwt.verify(token, config.SECRETS.ACCESS_TOKEN_SECRET);
  };

  verifyRefreshToken = (token: string) => {
    return jwt.verify(token, config.SECRETS.REFRESH_TOKEN_SECRET);
  };
}
