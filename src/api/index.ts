import * as Hapi from "hapi";
import ServerConfigurations from '../interfaces/server';
import { Database } from "../database";
import Users from "./Users";

export default (server: Hapi.Server, configs: ServerConfigurations, database: Database) : void => {
    console.log("Registering Routes");
    Users(server, configs, database);
    console.log("Routes registered sucessfully.");
}