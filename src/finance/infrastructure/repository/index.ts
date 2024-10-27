import { BudgetRepository } from './budgets.repository';
import { CategoryRepository } from './categories.repository';
import { TransactionRepository } from './transaction.repository';

const transaction_repository = new TransactionRepository();
const category_repository = new CategoryRepository();
const budget_repository = new BudgetRepository();

export { transaction_repository, category_repository, budget_repository};
