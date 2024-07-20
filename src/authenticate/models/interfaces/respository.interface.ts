
export interface IAuthenticateRepository<T> {
  create_user(userDetails: Partial<T>): Promise<string>;
  find_user_by_email(email: string): Promise<T | null>;
  find_user_by_id(id: number): Promise<T | null>;
  update_user(id: number, userDetails: Partial<T>): Promise<boolean>;
}
