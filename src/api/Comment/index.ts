import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import DatabaseService from "../../database/service";
import Routes from "./routes";

export default (server: Hapi.Server, configs: ServerConfigurations, databaseService: DatabaseService) => Routes(server, configs, databaseService);