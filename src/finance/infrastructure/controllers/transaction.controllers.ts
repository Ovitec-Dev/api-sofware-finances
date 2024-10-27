import { NextFunction, Request, Response } from 'express';
import { ITransactionService, Query } from '@finance/models';
import { Transaction } from '@shared/models';
import { verify_token } from '@shared/index';

class TransactionController {
  constructor(private readonly transaction_Service:ITransactionService<Transaction> ) {
//   constructor() {
    this.create_transaction = this.create_transaction.bind(this);
    this.get_transaction_by_id = this.get_transaction_by_id.bind(this);
    this.get_all_transactions_by_user = this.get_all_transactions_by_user.bind(this);
    this.update_transaction_id = this.update_transaction_id.bind(this);
    this.delete_transaction_id = this.delete_transaction_id.bind(this);
}

  async create_transaction(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const transaction = req.body as unknown as Transaction;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        const rto = await this.transaction_Service.create_trancation(transaction,parseInt(user.id, 10));
        res.status(200).json({ rto });
    } catch (error) {
      next(error);
    }
  }

  async get_transaction_by_id(req: Request, res: Response, next: NextFunction) {
    try {
        const trasaction = req.params as unknown as any;
        console.log('trasaction_id', trasaction.id);
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        if(!trasaction.id) throw new Error('trasaction_id is required');
        const rto = await this.transaction_Service.get_transaction_by_id(parseInt(trasaction.id, 10),parseInt(user.id, 10));
      res.status(200).json( rto );
    } catch (error) {
      next(error);
    }
  }

  async get_all_transactions_by_user(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query as unknown as Query;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        const rto = await this.transaction_Service.get_all_transactions_by_user(parseInt(user.id, 10),query);
      res.status(200).json( rto );
    } catch (error) {
      next(error);
    }
  }

  async update_transaction_id(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const  transaction_details = req.body as unknown as Partial<Transaction>;
      const rto = await this.transaction_Service.update_transaction_id(id, transaction_details);
      res.status(200).json( rto );
      // res.status(200).json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  }

  async delete_transaction_id(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const  rto = await this.transaction_Service.delete_transaction_id(id);
      res.status(200).json( rto );
      } catch (error) {
      next(error);
    }
  }
}

export default  TransactionController;

