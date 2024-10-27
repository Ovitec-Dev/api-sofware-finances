import { User, Transaction, Category, SubCategory } from '@shared/models';
import logger from '@shared/utils/logger';
import { ITransactionRepository } from '@finance/models';
import { Query } from '../../models/paramarts.model';

export class TransactionRepository implements ITransactionRepository<Transaction> {
  constructor(){
    this.create_transaction = this.create_transaction.bind(this);
    this.get_transaction_by_id = this.get_transaction_by_id.bind(this);
    this.get_all_transactions_by_user = this.get_all_transactions_by_user.bind(this);
    this.get_all_transactions = this.get_all_transactions.bind(this);
    this.update_transaction = this.update_transaction.bind(this);
  }

  async verify_user(user_id: number): Promise<boolean> {
    try {
      let exits = false;
      const user = await User.findOne({ where: { id: user_id } });
      if(user) exits = true;
    return exits;
    } catch (error) {
     logger.error('Error verifying user:', error);
      throw new Error('Database error');
    }
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

  async get_all_transactions_by_user(user_id: number, params?: Query): Promise<Transaction[]> {
    try {
      const sort = params?.order || 'created_at';
      const dir = params?.sort_dir || 'ASC'; 
      const limit = parseInt(params?.page_size || '10', 10); 
      const offset = parseInt(params?.page || '0', 10);
      return await Transaction.findAll({
        where: { user_id },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
        ],
        limit,
        offset,
        order: [[sort, dir]],
      });
    } catch (error) {
      logger.error('Error getting all transactions for user:', error);
      throw new Error('Failed to retrieve transactions');
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

  async update_transaction(id: number, transactionDetails: Partial<Transaction>): Promise<boolean> {
    const rto =await Transaction.update(transactionDetails, { where: { id } });
    if(!rto || rto === null ) return false;
    return true;
  }

  async delete_transaction(id: number): Promise<void> {
    try {
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      await transaction.destroy();
    } catch (error) {
      logger.error('Error deleting transaction:', error);
      throw error;
    }
  }
}

