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
        this.get_all_categories_by_user = this.get_all_categories_by_user.bind(this);
        
        this.create_subcategory = this.create_subcategory.bind(this);
        this.get_subcategories_by_category = this.get_subcategories_by_category.bind(this);
    }

  async get_all_categories_by_user(user_id: number): Promise<Category[]> {
  try {
    const categories = await Category.findAll({
      include: [{ model: SubCategory, attributes: ['id', 'name'] }],
      where: {
        user_id,
      },
    });
    if (categories.length === 0 || categories === null) throw new Error('No categories found');
    return categories;
  } catch (error) {
    logger.error('Error getting all categories by user:', error);
    throw error
  }  
}

  async create_subcategory(subcategoryDetails: SubCategory): Promise<boolean> {
    try {
      const subcategory = await SubCategory.create(subcategoryDetails);
      if(!subcategory) throw new Error('Error creating Sub_category');
      return true;
    } catch (error) {
      logger.error('Error creating Sub_category:', error);
      throw new Error('Database error');
    }  
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

  async update_category(id: number, categoryDetails: Partial<Category>): Promise<boolean> {
    try {
      const rto =await Category.update(categoryDetails, { where: { id } });
      if(!rto || rto === null ) return false;
      return true;
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
      logger.error('Error getting subcategories by Sub_category:', error);
      throw new Error('Database error');
    }
  }

  async update_subcategory(id: number, subcategoryDetails: Partial<SubCategory>): Promise<boolean> {
    try {
      const rto = await SubCategory.update(subcategoryDetails, { where: { id } });
      if(!rto || rto === null ) return false;
      return true;
    } catch (error) {
      logger.error('Error updating Sub_category:', error);
      throw new Error('Database error');
    }
  }

  async delete_subcategory(id: number): Promise<void> {
    try {
      await SubCategory.destroy({ where: { id } });
    } catch (error) {
      logger.error('Error deleting Sub_category:', error);
      throw new Error('Database error');
    }  }
}

