import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Database } from "../../database";
import DatabaseService from "../../database/service";
import Routes from "./routes";

export default (server: Hapi.Server, configs: ServerConfigurations, database: Database) => Routes(server, configs, new DatabaseService(database));
