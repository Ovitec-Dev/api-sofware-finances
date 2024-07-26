import { Router,Response, } from 'express';
import { authentication,adminController } from '../controllers';

const router = Router();

router.get('/auth',  async (_req, res: Response) => {
  const users = 'Hello you are into at future'
  res.send(users)
}); 

router.post('/register', adminController.register);

router.post('/login', adminController.login);

router.get('/loginOauth',authentication.auth_login);
  
router.get('/gtoken',authentication.post_login);

router.get('/refresh' ,authentication.refresh_token);

export default router;
  