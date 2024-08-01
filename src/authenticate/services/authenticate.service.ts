import { User } from "@shared/models";
import { IAuthService, IAuthenticateRepository, GoogleUserProfile, CreateUser } from "@authenticate/models";
import { Auth } from "@authenticate/infrastructure/auth/auth";
import  logger  from "@shared/utils/logger";

export class AuthService implements IAuthService<User> {
  constructor(private readonly UserRepository:IAuthenticateRepository<User>) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.saveGoogleUser = this.saveGoogleUser.bind(this);
    this.generateToken = this.generateToken.bind(this);
  }


  async register(userDetails: Partial<User>): Promise<string> {
    try {
      const hashedPassword = await Auth.hashPassword(userDetails.password!);
      const user = await this.UserRepository.create_user({
        ...userDetails,
        password: hashedPassword,
        auth_provider: 'local',
      });
      return user;
    } catch (error) {
      logger.error('Error registering user:', error);
      throw error
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      let token:string = '' 
      const user = await this.UserRepository.find_user_by_email(email);
      if(!user) throw new Error('general.UNAUTHORIZED.not_found');
      if (user) {
        const isValidPassword = await Auth.comparePassword(password, user.password)
        if (!isValidPassword) throw new Error('general.UNAUTHORIZED.invalid_access_key');
        token = await this.generateToken(user);
      }
      return token;
    } catch (error) {
      logger.error('Error logging in user:', error);
      throw error
    }
  }

  async generateToken(user: User): Promise<string> {
    return Auth.generateToken(user);
  }

  async saveGoogleUser(userDetails: GoogleUserProfile): Promise<string> {
    try {
      // Buscar el usuario por su email
      const existingUser = await this.UserRepository.find_user_by_email(userDetails.email!);
      let userId: string;
  
      if (!existingUser) {
        // Crear un nuevo usuario si no existe
        const newUserGoogle: CreateUser = {
          ...userDetails,
          password: '', // No se establece contraseña para usuarios de Google
          user_name: userDetails.name,
          google_id: userDetails.id,
          profile_picture: userDetails.picture,
          auth_provider: 'google',
          email_verified: userDetails.verified_email,
        };
        userId = await this.UserRepository.create_user(newUserGoogle);
      } else {
        // Si el usuario ya existe, usar su ID
        userId = existingUser.id.toString();
      }
  
      // Buscar el usuario por su ID
      const user = await this.UserRepository.find_user_by_id(parseInt(userId, 10));
      if(!user) throw new Error('general.UNAUTHORIZED.not_found');
  
      // Generar y devolver el token para el usuario
      return await this.generateToken(user);
    } catch (error) {
      // Manejo de errores
      logger.error('Error saving Google user:', error);
      throw error
    }
  }
  
  
  
}