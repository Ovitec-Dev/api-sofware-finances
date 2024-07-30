
import { SubCategory, Transaction } from "@shared/models";

export interface ICategoryRepository<T> {
  create_category(categoryDetails: Partial<T>): Promise<T>;
  get_category_by_id(id: number): Promise<T | null>;
  get_all_categories(): Promise<T[]>;
  update_category(id: number, categoryDetails: Partial<T>): Promise<void>;
  delete_category(id: number): Promise<void>;
  get_subcategories_by_category(category_id: number): Promise<SubCategory[]>;
  get_transactions_by_category(category_id: number): Promise<Transaction[]>;
}
