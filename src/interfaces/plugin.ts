import * as Hapi from "hapi";
import ServerConfigurations from "./server";

export interface PluginOptions {
    serverConfigs: ServerConfigurations;
}

export interface Plugin {
    register(server: Hapi.Server, options?: PluginOptions): Promise<void>;
    info(): PluginInfo;
}

export interface PluginInfo {
    name: string;
    version: string;
}

