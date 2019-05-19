import Sequelize from 'sequelize/index';
import { SequelizeAttributes } from '../../database/attributes';
import * as Bcrypt from "bcryptjs";
import { CommentAttributes, CommentInstance } from '../Comment/model';

export interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    comments?: CommentAttributes[] | CommentAttributes['id'][];
    createdAt?: Date;
    updatedAt?: Date;
};
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    createComment: Sequelize.HasManyCreateAssociationMixin<CommentAttributes, CommentInstance>;
}

const hashPassword = (password: string): string | null => {
    if (!password) {
        return null;
    }

    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}


export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    };

    const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

    User.beforeCreate((model, options) => {
        console.log(model.password);
        let user = model;

        if (!user.changed("password")) {
            return;
        }
        let hash = hashPassword(user["password"]);

        user["password"] = hash ? hash : '';

    });

    User.beforeBulkUpdate((model: any, options) => {
        if (!model.attributes.password) {
            return;
        }
        model.attributes.password = hashPassword(model.attributes.password);
    });


    return User;
};
