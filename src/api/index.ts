import * as Hapi from "hapi";
import ServerConfigurations from '../interfaces/server';
import Test from "./TestFeature";

export default (server: Hapi.Server, configs: ServerConfigurations) : void => {
    console.log("Registering Routes");
    Test(server, configs);
    console.log("Routes registered sucessfully.");
}