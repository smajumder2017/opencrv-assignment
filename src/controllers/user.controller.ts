import { EnhancedResponse } from '@/interfaces/responseHandler';
import { UserService } from '@/services';
import { Request } from 'express';

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  findUser = (req: Request, res: EnhancedResponse) => {
    res.success(req.user);
  };
}
