import { transaction_service } from '@finance/services';
import TransactionController from './transaction.controllers';

const user_transaction_Controller = new TransactionController(transaction_service);

export { user_transaction_Controller };
