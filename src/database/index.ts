import Sequelize from 'sequelize/index';
import DatabaseConfigurations from '../interfaces/database';
import { UserFactory, UserAttributes, UserInstance } from '../api/User/model';

export interface Database {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  userModel: Sequelize.Model<UserInstance, UserAttributes>;
}


export const init = (sequelizeConfig: DatabaseConfigurations): Database => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize.Sequelize(database, username, password ? password: '', params);

  const db: Database = {
    sequelize,
    Sequelize,
    userModel: UserFactory(sequelize, Sequelize)
  };

//   Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });

  return db;
};