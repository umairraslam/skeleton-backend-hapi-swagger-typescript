import * as Hapi from "hapi";
import ServerConfigurations from '../interfaces/server';
import User from "./User";
import Comment from "./Comment";
import DatabaseService from "../database/service";

export default (server: Hapi.Server, configs: ServerConfigurations,  databaseService: DatabaseService) : void => {
    console.log("Registering Routes");
    User(server, configs, databaseService);
    Comment(server, configs, databaseService);
    console.log("Routes registered sucessfully.");
}