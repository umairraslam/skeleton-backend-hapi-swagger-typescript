import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Request } from "../../interfaces/request";
import { Database } from "../../database";

export default class Controller {
    private configs: ServerConfigurations;
    private database: Database;

    constructor(configs: ServerConfigurations, database: Database) {
        this.configs = configs;
        this.database = database;
    }

    public create = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            let user: any = await this.database.userModel.create(request.payload);
            return h.response(user).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getAll = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response(await this.database.userModel.find()).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getById = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response(await this.database.userModel.find({_id: request.params.id})).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public update = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response(await this.database.userModel.update({_id: request.params.id}, request.payload)).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public delete = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response(await this.database.userModel.deleteOne({_id: request.params.id})).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }
}