// src/repositories/BudgetRepository.ts
import { Budget, User } from '@shared/models';
import logger from '@shared/utils/logger';
import { IBudgetRepository } from '@finance/models';

export class BudgetRepository implements IBudgetRepository<Budget> {
    constructor(){
        this.create_budget = this.create_budget.bind(this);
        this.get_budget_by_id = this.get_budget_by_id.bind(this);
        this.get_all_budgets_by_user = this.get_all_budgets_by_user.bind(this);
        this.update_budget = this.update_budget.bind(this);
        this.delete_budget = this.delete_budget.bind(this);
    }

  async create_budget(budgetDetails:Budget): Promise<Budget> {
    try {
      const budget = await Budget.create(budgetDetails);
      return budget;
    } catch (error) {
      logger.error('Error creating budget:', error);
      throw new Error('Database error');
    }
  }

  async get_budget_by_id(id: number): Promise<Budget | null> {
    try {
      const budget = await Budget.findByPk(id, {
        include: [{ model: User, attributes: ['id', 'email', 'user_name'] }]
      });
      return budget;
    } catch (error) {
      logger.error('Error getting budget by id:', error);
      throw new Error('Database error');
    }
  }

  async get_all_budgets_by_user(user_id: number): Promise<Budget[]> {
    try {
      return await Budget.findAll({
        where: { user_id },
        include: [{ model: User, attributes: ['id', 'email', 'user_name'] }]
      });
    } catch (error) {
      logger.error('Error getting all budgets for user:', error);
      throw new Error('Database error');
    }
  }

  async update_budget(id: number, budgetDetails: Partial<Budget>): Promise<void> {
    try {
      await Budget.update(budgetDetails, { where: { id } });
    } catch (error) {
      logger.error('Error updating budget:', error);
      throw new Error('Database error');
    }
  }

  async delete_budget(id: number): Promise<void> {
    try {
      await Budget.destroy({ where: { id } });
    } catch (error) {
      logger.error('Error deleting budget:', error);
      throw new Error('Database error');
    }
  }
}

