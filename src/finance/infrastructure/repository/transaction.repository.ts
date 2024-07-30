import { User, Transaction, Category, SubCategory } from '@shared/models';
import logger from '@shared/utils/logger';
import { ITransactionRepository } from '@finance/models';

export class TransactionRepository implements ITransactionRepository<Transaction> {
  constructor(){
    this.create_transaction = this.create_transaction.bind(this);
    this.get_transaction_by_id = this.get_transaction_by_id.bind(this);
    this.get_all_transactions_by_user = this.get_all_transactions_by_user.bind(this);
    this.get_all_transactions = this.get_all_transactions.bind(this);
    this.update_transaction = this.update_transaction.bind(this);
  }
  
  async create_transaction(transactionDetails: Transaction): Promise<Transaction> {
    const transaction = await Transaction.create(transactionDetails);
    
    return transaction;
  }

  async get_transaction_by_id(id: number, user_id: number): Promise<Transaction | null> {
    try {
      const transaction = await Transaction.findOne({
        where: { id, user_id },
        include: [
        //   { model: User, attributes: ['id', 'email', 'user_name'] },
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
        ],
      });
      return transaction;
    } catch (error) {
      logger.error('Error getting transaction by id:', error);
      throw new Error('Database error');
    }
  }

  async get_all_transactions_by_user(user_id: number): Promise<Transaction[]> {
    try {
      return await Transaction.findAll({
        where: { user_id },
        include: [
        //   { model: User, attributes: ['id', 'email', 'user_name'] },
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
        ],
      });
    } catch (error) {
      logger.error('Error getting all transactions for user:', error);
      throw new Error('Database error');
    }
  }


  async get_all_transactions(): Promise<Transaction[]> {
    try {
      return await Transaction.findAll({
        include: [
          { model: User, attributes: ['id', 'email', 'user_name'] },
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
        ],
      });
    } catch (error) {
      logger.error('Error getting all transactions:', error);
      throw new Error('Database error');
    }
  }

  async update_transaction(id: number, transactionDetails: Partial<Transaction>): Promise<void> {
    await Transaction.update(transactionDetails, { where: { id } });
  }

  async delete_transaction(id: number): Promise<void> {
    await Transaction.destroy({ where: { id } });
  }
}

