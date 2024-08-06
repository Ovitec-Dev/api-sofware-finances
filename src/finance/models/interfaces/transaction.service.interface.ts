import { Query } from "@finance/models";
import { Transaction } from "@shared/models";

export interface ITransactionService<T> {
  create_trancation(transaction_details: Partial<T>,user_id: number): Promise<string>;
  get_transaction_by_id(id: number, user_id: number,): Promise<T | null>;
  get_all_transactions_by_user(user_id: number, query: Query): Promise<T[]>;
  update_transaction_id(id: string, transaction_details: Partial<T>): Promise<boolean>;
  delete_transaction_id(id: string): Promise<void>;
}

export type UpdateTransaction = Partial<Transaction>;