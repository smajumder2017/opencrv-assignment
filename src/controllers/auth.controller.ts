import { UserService, AuthService } from '@/services';
import { Request } from 'express';
import bcrypt from 'bcryptjs';
import { EnhancedResponse } from '@/interfaces/responseHandler';

export class AuthController {
  private userService: UserService;
  private authService: AuthService;
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }
  register = async (
    req: Request<{}, {}, IUserCreate>,
    res: EnhancedResponse
  ) => {
    try {
      const body = req.body;
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      body.password = password;
      const user = await this.userService.create(body);
      delete user.password;
      res.success(user, 200);
    } catch (error) {
      res.error(error.message, 500);
    }
  };

  login = async (
    req: Request<{}, {}, ILoginRequest>,
    res: EnhancedResponse
  ) => {
    try {
      const user = await this.userService.findByEmail(req.body.email);
      if (!user) {
        res.error('User not found!', 400);
        return;
      }
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        res.error('Password mismatched!', 400);
        return;
      }
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      // generate accessToken/refreshToken and send the response
      const accessToken = this.authService.generateAccessToken(payload);
      const refreshToken = this.authService.generateRefreshToken(payload);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      });
      res.success({
        accessToken,
        // refreshToken,
      });
    } catch (error) {
      res.error(error.message, 500);
    }
  };
}
