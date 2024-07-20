import { authenticate_repository } from '@authenticate/infrastructure/repository'
import { AuthService } from './authenticate.service'

const authentication_Service = new AuthService(authenticate_repository );

export { authentication_Service };
