

import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Request } from "../../interfaces/request";
import DatabaseService from '../../database/service';
import { DatabaseModels } from "../../database";
import { UserInstance } from "../User/model";
import { CommentAttributes, CommentInstance } from "./model";

export default class Controller {
    private configs: ServerConfigurations;
    private databaseService: DatabaseService;
    private modelName:keyof DatabaseModels = "commentModel";

    constructor(configs: ServerConfigurations, databaseService: DatabaseService) {
        this.configs = configs;
        this.databaseService = databaseService;
    }

    public create = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            let payload:any = request.payload;
            let user = <UserInstance> await this.databaseService.getById(payload.author, "userModel");
            return h.response(await user.createComment(<CommentAttributes>request.payload)).code(200);
        } catch (error) {
            console.log(error)
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

    public delete = async (request: Request, h: Hapi.ResponseToolkit) : Promise<Object> => {
        try {
            await this.databaseService.delete(request.params.id, this.modelName);
            return h.response("Success").code(201);
        } catch (error) {
            return h.response({  }).code(500);
        }
    }

    public getAuthor = async (request : Request, h : Hapi.ResponseToolkit) : Promise<Object> => {
        try{
            let comment = <CommentInstance>await this.databaseService.getById(request.params.id, this.modelName);
            return JSON.stringify(await comment.getAuthor());
        } catch(error) {
            console.log(error);
            return h.response({}).code(500);
        }
    }
}