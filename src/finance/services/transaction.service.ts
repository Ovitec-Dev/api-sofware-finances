import { ITransactionRepository } from "@finance/models";
import { Transaction } from "@shared/models";

export class TransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository<Transaction>) {}

};