import { Router} from 'express';
import { authentication,adminController } from '../controllers';

const router = Router();

router.post('/register', adminController.register);

router.post('/login', adminController.login);

router.get('/loginOauth',authentication.auth_login);
  
router.get('/gtoken',authentication.post_login);

router.get('/refresh' ,authentication.refresh_token);

export default router;
  