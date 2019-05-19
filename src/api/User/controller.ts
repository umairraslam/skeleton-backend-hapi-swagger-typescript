

import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Request } from "../../interfaces/request";
import { DatabaseModels } from "../../database";
import UserService from "./service";

export default class Controller {
    private configs: ServerConfigurations;
    private databaseService: UserService;
    private modelName:keyof DatabaseModels = "userModel";

    constructor(configs: ServerConfigurations, databaseService: UserService) {
        this.configs = configs;
        this.databaseService = databaseService;
    }

    public create = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            return h.response(await this.databaseService.create(request.payload, this.modelName)).code(200);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getAll = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            return h.response(await this.databaseService.getAll(this.modelName)).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getById = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            return h.response(JSON.stringify(await this.databaseService.getById(request.params.id, this.modelName))).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public update = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            await this.databaseService.update(request.payload, request.params.id, this.modelName);
            return h.response("Success").code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public delete = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            await this.databaseService.delete(request.params.id, this.modelName);
            return h.response("Success").code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }
}