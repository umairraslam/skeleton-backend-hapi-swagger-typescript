import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import Routes from "./routes";

export default (server: Hapi.Server, configs: ServerConfigurations) => Routes(server, configs);

