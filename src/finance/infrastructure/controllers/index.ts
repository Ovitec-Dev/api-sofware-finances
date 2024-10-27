import { category_service, transaction_service } from '@finance/services';
import TransactionController from './transaction.controllers';
import CategoryController from './category.controllers';

const user_transaction_Controller = new TransactionController(transaction_service);
const user_category_Controller = new CategoryController(category_service)

export { user_transaction_Controller, user_category_Controller };
