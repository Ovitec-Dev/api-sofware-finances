import { Category, SubCategory, Transaction } from '@shared/models';
import logger from '@shared/utils/logger';
import { ICategoryRepository } from '@finance/models';

export class CategoryRepository implements ICategoryRepository<Category> {
    constructor(){
        this.create_category = this.create_category.bind(this);
        this.get_category_by_id = this.get_category_by_id.bind(this);
        this.get_all_categories = this.get_all_categories.bind(this);
        this.update_category = this.update_category.bind(this);
        this.delete_category = this.delete_category.bind(this);
        this.get_subcategories_by_category = this.get_subcategories_by_category.bind(this);
        this.get_transactions_by_category = this.get_transactions_by_category.bind(this);
    }

  async create_category(categoryDetails: Category): Promise<Category> {
    try {
      const category = await Category.create(categoryDetails);
      return category;
    } catch (error) {
      logger.error('Error creating category:', error);
      throw new Error('Database error');
    }
  }

  async get_category_by_id(id: number): Promise<Category | null> {
    try {
      const category = await Category.findByPk(id, {
        include: [
          { model: SubCategory, attributes: ['id', 'name'] },
          { model: Transaction, attributes: ['id', 'type', 'amount', 'date'] }
        ]
      });
      return category;
    } catch (error) {
      logger.error('Error getting category by id:', error);
      throw new Error('Database error');
    }
  }

  async get_all_categories(): Promise<Category[]> {
    try {
      return await Category.findAll({
        include: [
          { model: SubCategory, attributes: ['id', 'name'] },
          { model: Transaction, attributes: ['id', 'type', 'amount', 'date'] }
        ]
      });
    } catch (error) {
      logger.error('Error getting all categories:', error);
      throw new Error('Database error');
    }
  }

  async update_category(id: number, categoryDetails: Partial<Category>): Promise<void> {
    try {
      await Category.update(categoryDetails, { where: { id } });
    } catch (error) {
      logger.error('Error updating category:', error);
      throw new Error('Database error');
    }
  }

  async delete_category(id: number): Promise<void> {
    try {
      await Category.destroy({ where: { id } });
    } catch (error) {
      logger.error('Error deleting category:', error);
      throw new Error('Database error');
    }
  }

  async get_subcategories_by_category(category_id: number): Promise<SubCategory[]> {
    try {
      const category = await Category.findByPk(category_id, {
        include: [{ model: SubCategory, attributes: ['id', 'name'] }]
      });
      return category ? category.sub_categories : [];
    } catch (error) {
      logger.error('Error getting subcategories by category:', error);
      throw new Error('Database error');
    }
  }

  async get_transactions_by_category(category_id: number): Promise<Transaction[]> {
    try {
      const category = await Category.findByPk(category_id, {
        include: [{ model: Transaction, attributes: ['id', 'type', 'amount', 'date'] }]
      });
      return category ? category.transactions : [];
    } catch (error) {
      logger.error('Error getting transactions by category:', error);
      throw new Error('Database error');
    }
  }
}

