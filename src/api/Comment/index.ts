import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import DatabaseService from "../../database/service";
import Routes from "./routes";
import CommentService from "./service";

export default (server: Hapi.Server, configs: ServerConfigurations, databaseService: DatabaseService) => Routes(server, configs, new CommentService(databaseService.getDatabaseObject()));