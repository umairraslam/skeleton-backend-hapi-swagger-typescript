import mongoose from "mongoose";
import DatabaseConfigurations from "../interfaces/database";
import { User, UserModel } from "../api/User/model";
import { Comment, CommentModel } from "../api/Comment/model";
import DatabaseService from "./service";

export interface Database {
    models: DatabaseModels
}
export interface DatabaseModels {
  userModel: mongoose.Model<User>;
  commentModel: mongoose.Model<Comment>;
}

export const init = (config: DatabaseConfigurations): DatabaseService => {
    (<any>mongoose).Promise = Promise;
    mongoose.connect(process.env.MONGO_URL || config.connectionString);

    let mongoDb = mongoose.connection;

    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    const models : DatabaseModels = {
        userModel: UserModel,
        commentModel: CommentModel
    };

    const db = {
        models: models
    };

    console.log("Database Service initialized")
    return new DatabaseService(db);
}
