import * as Hapi from "hapi";
import ServerConfigurations from '../interfaces/server';
import User from "./User";
import { Database } from "../database";

export default (server: Hapi.Server, configs: ServerConfigurations,  database: Database) : void => {
    console.log("Registering Routes");
    User(server, configs, database);
    console.log("Routes registered sucessfully.");
}