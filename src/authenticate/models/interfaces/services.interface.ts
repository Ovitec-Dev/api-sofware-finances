import { GoogleUserProfile } from "../google_types";

export interface IAuthService<T> {
  register(TDetails: Partial<T>): Promise<string>;
  login(email: string, password: string): Promise<string>;
  saveGoogleUser(TDetails: GoogleUserProfile): Promise<string>;
  generateToken(T: T): Promise<string>;
}

