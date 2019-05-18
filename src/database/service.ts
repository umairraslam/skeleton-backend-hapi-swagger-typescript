import { Database, DatabaseModels, DatabaseAttributes } from "../database";

export default class DatabaseService {
    private database: Database;    

    constructor(database: Database) {
        this.database = database;
    }

    public create = async (payload: Object, model:keyof DatabaseModels) : Promise<Object> => {
        return await this.database.models[model].create(<DatabaseAttributes>payload);
    }

    public getAll = async(model:keyof DatabaseModels) : Promise<Object> => {
        return await this.database.models[model].findAll();
    }

    public getById = async(id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].findOne({where: {id:id}});
    }

    public update = async(payload: Object, id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].update(<Partial<DatabaseAttributes>>payload, {where:{id: id}});
    }

    public delete = async(id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].destroy({where:{id: id}});
    }

}