
export interface IRepository {
    verify_user(userId: number): Promise<boolean>;
}