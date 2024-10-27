import { Router} from 'express';
import { user_category_Controller } from '@finance/infrastructure/controllers';

const router = Router();

router.get('/finance/categories', user_category_Controller.get_category_by_id);
router.get('/finance/categories/:id', user_category_Controller.get_category_by_id);
router.post('/finance/categories', user_category_Controller.create_category);
router.patch('/finance/categories/:id', user_category_Controller.update_category_id);
router.delete('/finance/categories/:id', user_category_Controller.delete_category_id);

router.post('/finance/sub_categories', user_category_Controller.create_sub_category);
router.get('/finance/sub_categories/:id', user_category_Controller.get_sub_category_by_category);
router.patch('/finance/sub_categories/:id', user_category_Controller.update_sub_category_id);
router.delete('/finance/sub_categories/:id', user_category_Controller.delete_sub_category_id);

export default router;
  