
import { SubCategory } from "@shared/models";

export interface ICategoryRepository<T> {
  create_category(categoryDetails: Partial<T>): Promise<T>;
  get_category_by_id(id: number): Promise<T | null>;
  get_all_categories(): Promise<T[]>;
  get_all_categories_by_user(user_id: number): Promise<T[]>;
  update_category(id: number, categoryDetails: Partial<T>): Promise<boolean>;
  delete_category(id: number): Promise<void>;

  create_subcategory( subcategoryDetails: Partial<SubCategory>): Promise<boolean>;
  get_subcategories_by_category(category_id: number): Promise<SubCategory[]>;
  update_subcategory(id: number, subcategoryDetails: Partial<SubCategory>): Promise<boolean>;
  delete_subcategory(id: number): Promise<void>;

}
