import { NextFunction, Request, Response } from 'express';
import { authentication_Service } from '@authenticate/services';

class AuthController {
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
      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
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
    // Implementa la lógica para el olvido de la contraseña aquí
  }
}

export default  AuthController;

