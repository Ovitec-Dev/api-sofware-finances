import { transaction_repository, category_repository} from "@finance/infrastructure/repository";
import { TransactionService } from "@finance/services/transaction.service";
import { CategoryService } from "@finance/services/category.service";

const transaction_service =  new TransactionService(transaction_repository);
const category_service =  new CategoryService(category_repository);

export { transaction_service ,category_service};