
export interface ITransactionRepository<T> {
  create_transaction(transactionDetails: T ): Promise<T>;
  get_transaction_by_id(id: number, userId: number): Promise<T | null>;
  get_all_transactions_by_user(userId: number): Promise<T[]>;
  get_all_transactions(): Promise<T[]>;
  update_transaction(id: number, transactionDetails: Partial<T>): Promise<void>;
  delete_transaction(id: number): Promise<void>;
}
