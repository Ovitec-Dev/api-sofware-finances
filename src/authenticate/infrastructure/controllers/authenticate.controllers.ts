import { NextFunction, Request, Response } from 'express';
import { authentication_Service } from '@authenticate/services';

class AuthController {
  // constructor(private readonly incident_report_Service:IIncident_report_Service<ICase> ) {
  constructor() {

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userdata = req.body;
      const user = await authentication_Service.register(userdata);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
      const token = await authentication_Service.login(email, password);
      if (!token) throw new Error('general.UNAUTHORIZED.not_found_user');
      res.status(200).json({ accessToken: token });
    } catch (error) {
      next(error);
    }
  }



  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  }
}

export default  AuthController;

