import {
  BelongsToGetAssociationMixin,
  CreationOptional, DataTypes as types, ForeignKey, InferAttributes,
  InferCreationAttributes, Model, Sequelize,
} from 'sequelize';
import { Role } from './Role';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare roleId: ForeignKey<Role['id']>;

  declare getRole: BelongsToGetAssociationMixin<Role>;

  static associate(models: any) {
    User.belongsTo(models.Role);
  }
}

export default function initUserModel(sequelize: Sequelize, DataTypes: typeof types) {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    paranoid: false,
    underscored: true,
  });
  return User;
}
