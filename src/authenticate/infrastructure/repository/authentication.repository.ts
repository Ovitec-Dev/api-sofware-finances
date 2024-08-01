import { User } from '@shared/models';
import { IAuthenticateRepository } from '@authenticate/models/index'
import logger from '@shared/utils/logger';

export class AuthenticateRepository implements IAuthenticateRepository<User> {
  constructor() {
        this.create_user = this.create_user.bind(this);
        this.find_user_by_email = this.find_user_by_email.bind(this);
        this.find_user_by_id = this.find_user_by_id.bind(this);
        this.update_user = this.update_user.bind(this);
    }
           
  async create_user(userDetails: Partial<User>): Promise<string> {
      try {
        const user = await User.create(userDetails as User);
        if (!user) return 'error al crear usuario';
        return `${user.id}` ; 
      } catch (error) {
        logger.error('Error creating user:', error);
        throw error
      }
  }

  async find_user_by_email(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ 
        where: { email },
        attributes:[],
        raw: true
      });
      if (!user) return {} as User;
      return user;
    } catch (error) {
      logger.error('Error finding user by email:', error);
      throw error
    }
  }

  async find_user_by_id(id: number): Promise<User | null> {
    try {
      const rto = await User.findByPk( 
        id, 
      {
        attributes:[], 
        raw: true
      });
      if (!rto)  return {} as User;
      return rto;
    } catch (error) {
        logger.error('Error finding user by id:', error);
        throw error
      }
  }

  async update_user(id: number, changes: Partial<User>): Promise<boolean> {
    try {
      const { ...updateData } = changes;
      const [updated] = await User.update(updateData, {
          where: { id }
      });
      if (updated === 0) return false;
      return true;
  } catch (error) {
      logger.error('Error updating user:', error);
      throw error
  }
  }
}
