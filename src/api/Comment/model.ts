import Sequelize from 'sequelize/index';
import { SequelizeAttributes } from '../../database/attributes';
import { UserAttributes, UserInstance } from '../User/model';

export interface CommentAttributes {
    id?: number;
    text: string;
    author?: UserAttributes | UserAttributes['id'];
    createdAt?: Date;
    updatedAt?: Date;
};
export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
    getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}

export const CommentFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<CommentInstance, CommentAttributes> => {
    const attributes: SequelizeAttributes<CommentAttributes> = {
        text: {
            type: DataTypes.STRING
        }
    };

    const Comment = sequelize.define<CommentInstance, CommentAttributes>('Comment', attributes);

    return Comment;
};
