

import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Request } from "../../interfaces/request";
import { Database } from "../../database";
import {UserAttributes} from "./model";
import {UpdateOptions} from 'sequelize/index';

export default class Controller {
    private configs: ServerConfigurations;
    private database: Database;

    constructor(configs: ServerConfigurations, database: Database) {
        this.configs = configs;
        this.database = database;
    }

    public create = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            let user: any = await this.database.userModel.create(<UserAttributes>request.payload);
            return h.response(user).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getAll = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response(await this.database.userModel.findAll()).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getById = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            console.log(request.params)
            return h.response(JSON.stringify(await this.database.userModel.findOne({where: {id:request.params.id}}))).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public update = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            return h.response(await this.database.userModel.update(<Partial<UserAttributes>>request.payload, {where:{id: request.params.id}})).code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public delete = async (request: Request, h: Hapi.ResponseToolkit) => {
        try {
            await this.database.userModel.destroy({where: {id: request.params.id}})
            return h.response("Success").code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }
}