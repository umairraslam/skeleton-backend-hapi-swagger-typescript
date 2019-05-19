

import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Request } from "../../interfaces/request";
import DatabaseService from '../../database/service';

export default class Controller {
    private configs: ServerConfigurations;
    private databaseService: DatabaseService;

    constructor(configs: ServerConfigurations, databaseService: DatabaseService) {
        this.configs = configs;
        this.databaseService = databaseService;
    }

    public create = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            return h.response(await this.databaseService.create(request.payload, "userModel")).code(200);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getAll = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            return h.response(await this.databaseService.getAll("userModel")).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getById = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            return h.response(JSON.stringify(await this.databaseService.getById(request.params.id, "userModel"))).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public update = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            await this.databaseService.update(request.payload, request.params.id, "userModel");
            return h.response("Success").code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public delete = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            await this.databaseService.delete(request.params.id, "userModel");
            return h.response("Success").code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }
}