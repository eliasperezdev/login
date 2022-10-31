import { Sequelize, DataTypes, Options } from 'sequelize';
import initUserModel from './User';
import initRoleModel from './Role';
import configFile from '../db/config/config';

type EnvType = 'development' | 'test' | 'production';
const env: EnvType = process.env.NODE_ENV as EnvType || 'development';
const config: Options = configFile[env] as Options;

const sequelize = new Sequelize(config);
const db = {
  User: initUserModel(sequelize, DataTypes),
  Role: initRoleModel(sequelize, DataTypes),
  sequelize,
};

db.Role.associate(db);
db.User.associate(db);

export default db;
