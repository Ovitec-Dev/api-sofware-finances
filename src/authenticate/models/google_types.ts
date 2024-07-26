// import { User } from "@shared/models";

export interface GoogleUserProfile {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
  }
  

//   export type CreateUser = Omit<User, 'id' | 'transactions' | 'budgets'>;
  

export interface CreateUser {
  email: string;
  password: string;
  user_name: string;
  google_id?: string;
  profile_picture?: string;
  auth_provider: string;
  email_verified: boolean;
  reset_token?: string;
  reset_token_expiration?: Date;
  phone?: string;
  address?: string;
  birthday?: Date;
  email_verification_token?: string;
}
