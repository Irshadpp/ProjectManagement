import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";


class Project extends Model {
  public id!: number;
  public name!: string;
  public creatorId!: number; // foriegn key for the project owner
  public description!: string;
}

Project.init(
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
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
  }
);

export default Project;
