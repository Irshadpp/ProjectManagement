import { User } from "../models";
import { IUserService } from "./user.services.interface";

export class UserService implements IUserService {
  async findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return User.create(userData);
  }

  async findUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }
}

export default new UserService();
