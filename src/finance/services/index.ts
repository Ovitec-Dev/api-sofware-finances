import { transaction_repository } from "@finance/infrastructure/repository";
import { TransactionService } from "@finance/services/transaction.service";

const transaction_service =  new TransactionService(transaction_repository);

export { transaction_service };