import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Database } from "../../database";
import Routes from "./routes";

export default (server: Hapi.Server, configs: ServerConfigurations, database: Database) => Routes(server, configs, database);