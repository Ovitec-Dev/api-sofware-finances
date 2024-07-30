import { Router,Response, } from 'express';

const router = Router();

router.get('/finance',  async (_req, res: Response) => {
  const users = 'Hello you are into at future'
  res.send(users)
}); 


export default router;
  