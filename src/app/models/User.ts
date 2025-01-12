import { BelongsToManyAddAssociationMixin, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";
import Project from "./Project";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;

  //association mixins for User-Project many-to-many relationship
  public addProject!: BelongsToManyAddAssociationMixin<Project, number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
