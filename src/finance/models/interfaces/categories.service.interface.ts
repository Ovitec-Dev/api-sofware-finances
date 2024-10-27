
import { Category, SubCategory } from "@shared/models";

export interface ICategoryService<T> {
  create_category(category_details: Partial<T>,user_id: number): Promise<string>;
  get_categories_by_id(id: number, user_id: number): Promise<T | null>;
  get_all_category_by_user(user_id: number): Promise<T[]>;
  update_category_id(id: string, transaction_details: Partial<T>): Promise<boolean>;
  delete_category_id(id: string): Promise<void>;

  create_subcategory(subcategory_details: Partial<SubCategory>, category_id: number): Promise<boolean>;
  get_subcategories_by_category(category_id: number): Promise<SubCategory[]>;
  update_sub_category_id(id: string, subcategory_details: Partial<SubCategory>): Promise<boolean>;
  delete_sub_category_id(id: string): Promise<void>;
}

export type UpdateCategory = Partial<Category>;