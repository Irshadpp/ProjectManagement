import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

class Task extends Model {
  id!: number;
  name!: string;
  description!: string;
  status!: string;
  projectId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
      allowNull: false,
      defaultValue: "To Do",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
  }
);

export default Task;
