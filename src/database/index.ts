import Sequelize from 'sequelize/index';
import DatabaseConfigurations from '../interfaces/database';
import * as User from '../api/User/model';
import * as Comment from '../api/Comment/model';
import DatabaseService from './service';

export interface Database {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  models: DatabaseModels
}

export interface DatabaseModels {
  userModel: Sequelize.Model<User.UserInstance, User.UserAttributes>;
  commentModel: Sequelize.Model<Comment.CommentInstance, Comment.CommentAttributes>;
}

export interface DatabaseAttributes extends User.UserAttributes, Comment.CommentAttributes {
}

export const init = (sequelizeConfig: DatabaseConfigurations): DatabaseService => {
  console.log("Initializing Database Service")
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize.Sequelize(database, username, password ? password: '', params);

  const commentModel = Comment.CommentFactory(sequelize, Sequelize);
  const userModel = User.UserFactory(sequelize, Sequelize);
  userModel.hasMany(commentModel, { foreignKey: 'authorId', as: 'comments' });
  commentModel.belongsTo(userModel, { as: 'author', foreignKey: 'authorId' });

  const models: DatabaseModels = {
    userModel: userModel,
    commentModel: commentModel
  }

  const db: Database = {
    sequelize,
    Sequelize,
    models
  };

  console.log("Database Service initialized")
  return new DatabaseService(db);
};