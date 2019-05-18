import Sequelize from 'sequelize/index';
import DatabaseConfigurations from '../interfaces/database';
import { UserFactory, UserAttributes, UserInstance } from '../api/User/model';

export interface Database {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  models: DatabaseModels
}
export interface DatabaseModels {
  userModel: Sequelize.Model<UserInstance, UserAttributes>;
}

export interface DatabaseAttributes extends UserAttributes {

}

export const init = (sequelizeConfig: DatabaseConfigurations): Database => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize.Sequelize(database, username, password ? password: '', params);

  const models: DatabaseModels = {
    userModel: UserFactory(sequelize, Sequelize)
  }

  const db: Database = {
    sequelize,
    Sequelize,
    models
  };

//   Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });

  return db;
};