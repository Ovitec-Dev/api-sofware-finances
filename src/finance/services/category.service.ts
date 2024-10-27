/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from "@finance/infrastructure/repository/respository";
import { ICategoryRepository, ICategoryService} from "@finance/models";
import { Category, SubCategory } from "@shared/models";
import logger from '@shared/utils/logger';


export class CategoryService extends Repository implements ICategoryService<Category> {
    constructor(private readonly catergoriesRepository: ICategoryRepository<Category>) {
        super();
        this.create_category = this.create_category.bind(this);
        this.get_categories_by_id = this.get_categories_by_id.bind(this);
        this.get_all_category_by_user = this.get_all_category_by_user.bind(this);
        this.update_category_id = this.update_category_id.bind(this);
        this.delete_category_id = this.delete_category_id.bind(this);

        this.create_subcategory = this.create_subcategory.bind(this);
        this.get_subcategories_by_category = this.get_subcategories_by_category.bind(this);
        this.update_sub_category_id = this.update_sub_category_id.bind(this);
        this.delete_sub_category_id = this.delete_sub_category_id.bind(this);
    }

    async create_category(data_details: Partial<Category>, user_id: number): Promise<string> {
        try {
            const category_details: Partial<Category> = data_details;
            const verified_user = await super.verify_user(user_id);
            if (!verified_user) throw new Error('User not found');
            category_details.user_id = user_id;
            const transaction = await this.catergoriesRepository.create_category(category_details as Category);
            if (!transaction) throw new Error('error creating Category');
            return `${transaction.id}`;
          } catch (error) {
            logger.error('Error creating Category:', error);
            throw error;
          }
    }

    async get_categories_by_id(id: number, user_id: number): Promise<Category | null> {
        try {
            const verified_user = await super.verify_user(user_id);
            if(verified_user === false) throw new Error('User not found');
            const category = await this.catergoriesRepository.get_category_by_id(id);
            if(!category) throw new Error('Category not found');
            return category;
          } catch (error) {
            logger.error('Error getting category by id:', error);
            throw error;
          }    }

    async get_all_category_by_user(user_id: number): Promise<Category[]> {
        try {
            let categories : Category[] = [];
            const verified_user = await super.verify_user(user_id);
            if(verified_user === false) throw new Error('User not found');
            categories = await this.catergoriesRepository.get_all_categories_by_user(user_id);
            return categories;
          } catch (error) {
            logger.error('Error getting all transactions for user:', error);
            throw error;
          }    }

    async update_category_id(id: string, data_details: Partial<Category>): Promise<boolean> {
        try {
            const categories = await this.catergoriesRepository.update_category(parseInt(id, 10), data_details);
            if (categories === false  && !categories)   throw new Error('Category not found');
            return true;
            } catch (error) {
            logger.error('Error updating category:', error);
            throw error;
            } 
    }

    async delete_category_id(id: string): Promise<void> {
        try {
            await this.catergoriesRepository.delete_category(parseInt(id, 10));
          } catch (error) {
            logger.error('Error deleting category:', error);
            throw error;
          }
    }

    async create_subcategory(data_details: Partial<SubCategory>, category_id: number): Promise<boolean> {
        try {
            const subcategory_details: Partial<SubCategory> = data_details;
            const verified_user = await this.catergoriesRepository.get_category_by_id(category_id);
            if (!verified_user) throw new Error('category not found');
            subcategory_details.category_id = category_id;
            const subcategory = await this.catergoriesRepository.create_subcategory(subcategory_details as SubCategory);
            if (!subcategory) throw new Error('error creating category');
            return true;
          } catch (error) {
            logger.error('Error creating category:', error);
            throw error;
          }    }

    async get_subcategories_by_category(category_id: number): Promise<SubCategory[]>  {
        try {
            let subcategories : SubCategory[] = [];
            const verified_category = await this.catergoriesRepository.get_category_by_id(category_id);
            if(!verified_category) throw new Error('category not found');
            subcategories = await this.catergoriesRepository.get_subcategories_by_category(category_id);
            return subcategories;
          } catch (error) {
            logger.error('Error getting all transactions for user:', error);
            throw error;
          }
    }

    async update_sub_category_id(id: string, subcategory_details: Partial<SubCategory>): Promise<boolean> {
        try {
            const subcategory = await this.catergoriesRepository.update_subcategory(parseInt(id, 10), subcategory_details);
            if (subcategory === false  && !subcategory)  throw new Error('Transaction not found');
            return true;
            } catch (error) {
            logger.error('Error updating transaction:', error);
            throw error;
            }     }

    async delete_sub_category_id(id: string): Promise<void> {
        try {
            await this.catergoriesRepository.delete_subcategory(parseInt(id, 10));
          } catch (error) {
            logger.error('Error deleting transaction:', error);
            throw error;
          }    }

}