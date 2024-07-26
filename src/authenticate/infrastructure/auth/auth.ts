import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@shared/models';

export class Auth {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static async generateToken(user: User): Promise<string> {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
  }
}
