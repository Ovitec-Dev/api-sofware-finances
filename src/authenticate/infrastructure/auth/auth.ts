import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@shared/models';
import { config } from '@shared/index';

export class Auth {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static async generateToken(user: User): Promise<string> {
    console.log(`${config.JWT_SECRET}`)
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET as string, {
      expiresIn: '1h',
    });
  }
}
