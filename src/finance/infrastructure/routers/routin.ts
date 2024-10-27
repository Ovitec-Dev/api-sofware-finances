// import { AppError } from '@shared/handler/handler';
import { Router,Response, NextFunction, } from 'express';
import  logger  from '@shared/utils/logger';

const router = Router();

router.get('/finance',  async (_req, res: Response, next:NextFunction) => {
  
try {
  // Lógica del negocio
  const someCondition = true
  if (someCondition) {
    throw new Error('http_client.get_error');
  }
  res.send('Verificado users')
} catch (error) {
  logger.error(`Error desde el controlador : ${(error as Error).message}`);
  next(error);
}
}); 


export default router;
  