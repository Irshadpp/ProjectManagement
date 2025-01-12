import { User } from "../models";

export interface IUserService {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    findUserById(id: number): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
  }