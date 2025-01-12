import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

class User extends Model{
    public id!: number;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users"
    }
)

export default User