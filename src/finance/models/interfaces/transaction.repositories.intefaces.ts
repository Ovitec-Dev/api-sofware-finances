import { Query } from "@finance/models";

export interface ITransactionRepository<T> {
  verify_user(userId: number): Promise<boolean>;
  create_transaction(transactionDetails: T ): Promise<T>;
  get_transaction_by_id(id: number, userId: number): Promise<T | null>;
  get_all_transactions_by_user(userId: number, query?: Query): Promise<T[]>;
  get_all_transactions(): Promise<T[]>;
  update_transaction(id: number, transactionDetails: Partial<T>): Promise<boolean>;
  delete_transaction(id: number): Promise<void>;
}
