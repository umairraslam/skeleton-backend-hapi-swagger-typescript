import mongoose from "mongoose";
import DatabaseConfigurations from "../interfaces/database";
import { User, UserModel } from "../api/Users/model";

export interface Database {
    userModel: mongoose.Model<User>;
}

export const init = (config: DatabaseConfigurations): Database => {
    (<any>mongoose).Promise = Promise;
    mongoose.connect(process.env.MONGO_URL || config.connectionString);

    let mongoDb = mongoose.connection;

    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        userModel: UserModel
    };
}
