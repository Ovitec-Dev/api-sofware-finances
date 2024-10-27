import { Router} from 'express';
import { user_transaction_Controller } from '@finance/infrastructure/controllers';

const router = Router();

router.get('/finance/transactions', user_transaction_Controller.get_all_transactions_by_user);
router.get('/finance/transactions/:id', user_transaction_Controller.get_transaction_by_id);
router.post('/finance/transactions', user_transaction_Controller.create_transaction);
router.patch('/finance/transactions/:id', user_transaction_Controller.update_transaction_id);
router.delete('/finance/transactions/:id', user_transaction_Controller.delete_transaction_id);

export default router;
  