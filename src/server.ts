import * as Hapi from "hapi";
import ServerConfigurations from '../src/interfaces/server';
import API from "./api"; 
import Plugins from "./plugins";

export default async (configs: ServerConfigurations) : Promise<Hapi.Server> => {
    try {
        const server = new Hapi.Server({
            debug: { request: ['error'] },
            port: configs.port,
            routes: {
                cors: {
                    origin: ["*"]
                }
            }
        });

        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }

        await Plugins(server, configs);
        API(server, configs);
        return server;
    } catch (err) {
        console.log(err);
        throw err;
    }
}