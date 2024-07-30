export interface IBudgetRepository<T> {
    create_budget(budgetDetails: Partial<T>): Promise<T>;
    get_budget_by_id(id: number): Promise<T | null>;
    get_all_budgets_by_user(user_id: number): Promise<T[]>;
    update_budget(id: number, budgetDetails: Partial<T>): Promise<void>;
    delete_budget(id: number): Promise<void>;
  }
  