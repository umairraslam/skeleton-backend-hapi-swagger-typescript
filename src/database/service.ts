import { Database, DatabaseModels } from "../database";

export default class DatabaseService {
    protected database: Database;    

    constructor(database: Database) {
        this.database = database;
    }

    public create = async (payload: Object, model:keyof DatabaseModels) : Promise<Object> => {
        return await this.database.models[model].create(payload);
    }

    public getAll = async(model:keyof DatabaseModels) : Promise<Object> => {
        return await this.database.models[model].find({});
    }

    public getById = async(id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].find({_id:id});
    }

    public update = async(payload: Object, id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].update({_id: id}, payload);
    }

    public delete = async(id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].deleteOne({_id: id});
    }

    public getDatabaseObject() : Database{
        return this.database;
    }

}