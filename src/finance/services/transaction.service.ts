import { ITransactionRepository, ITransactionService, Query } from "@finance/models";
import { Transaction } from "@shared/models";
import logger from '@shared/utils/logger';

export class TransactionService implements ITransactionService<Transaction> {
  constructor(private readonly transactionRepository: ITransactionRepository<Transaction>) {
    this.create_trancation = this.create_trancation.bind(this);
    this.get_transaction_by_id = this.get_transaction_by_id.bind(this);
    this.get_all_transactions_by_user = this.get_all_transactions_by_user.bind(this);
    this.update_transaction_id = this.update_transaction_id.bind(this);
    this.delete_transaction_id = this.delete_transaction_id.bind(this);
  }

  async create_trancation( data_details: Partial<Transaction>, user_id: number): Promise<string> {
  try {
    const transaction_details :  Partial<Transaction> = data_details;
    const verified_user = await this.transactionRepository.verify_user(user_id);
    if(verified_user === false) throw new Error('User not found');
    transaction_details.user_id = user_id;
    const transaction = await this.transactionRepository.create_transaction(transaction_details as Transaction);
    if(!transaction) throw new Error('error creating transaction');
    return `${transaction.id}`;
  } catch (error) {
    logger.error('Error creating transaction:', error);
    throw error;

  }
  }

  async get_transaction_by_id(id: number, user_id: number): Promise<Transaction | null> {
    try {
      const verified_user = await this.transactionRepository.verify_user(user_id);
      if(verified_user === false) throw new Error('User not found');
      const transaction = await this.transactionRepository.get_transaction_by_id(id, user_id);
      if(!transaction) throw new Error('Transaction not found');
      return transaction;
    } catch (error) {
      logger.error('Error getting transaction by id:', error);
      throw error;
    }
  }

  async get_all_transactions_by_user(user_id: number, query: Query): Promise<Transaction[]> {
    try {
      let transactions : Transaction[] = [];
      const verified_user = await this.transactionRepository.verify_user(user_id);
      if(verified_user === false) throw new Error('User not found');
       transactions = await this.transactionRepository.get_all_transactions_by_user(user_id, query);
      return transactions;
    } catch (error) {
      logger.error('Error getting all transactions for user:', error);
      throw error;
    }
  }

  async update_transaction_id(id: string, transaction_details: Partial<Transaction>): Promise<boolean> {
  try {
    const transaction = await this.transactionRepository.update_transaction(parseInt(id, 10), transaction_details);
    if (transaction === false  && !transaction) {
      throw new Error('Transaction not found');
    }

    return true;
  } catch (error) {
    logger.error('Error updating transaction:', error);
    throw error;
  }  }


  async delete_transaction_id(id: string): Promise<void> {
    try {
      await this.transactionRepository.delete_transaction(parseInt(id, 10));
    } catch (error) {
      logger.error('Error deleting transaction:', error);
      throw error;
    }
  }
};