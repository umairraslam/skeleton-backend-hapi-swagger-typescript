import * as Hapi from "hapi";
import { Plugin } from "../interfaces/plugin";
import ServerConfigurations from '../interfaces/server';

export default async (server: Hapi.Server, configs: ServerConfigurations) : Promise<any> => {
    console.log("Registering Plugins.");
    const plugins: Array<string> = configs.plugins;
    const pluginOptions = { serverConfigs: configs };
    let pluginPromises: Promise<any>[] = [];
    plugins.forEach((pluginName: string) => {
        var plugin: Plugin = require("../plugins/" + pluginName + ".ts").default();
        console.log(
            `Registering Plugin ${plugin.info().name} v${plugin.info().version}`
        );
        pluginPromises.push(plugin.register(server, pluginOptions));
    })

    await Promise.all(pluginPromises);
    console.log("All plugins registered successfully.");
}