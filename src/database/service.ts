import { Database, DatabaseModels, DatabaseAttributes } from "../database";
import { UserInstance } from "../api/User/model";
import { CommentInstance } from "../api/Comment/model";

export default class DatabaseService {
    private database: Database;    

    constructor(database: Database) {
        this.database = database;
    }
    
    public getModel = (model: keyof DatabaseModels) => {
        return this.database.models[model];
    }

    public create = async (payload: Object, model:keyof DatabaseModels) : Promise<Object> => {
        return await this.database.models[model].create(<DatabaseAttributes>payload);
    }

    public getAll = async(model:keyof DatabaseModels) : Promise<Object> => {
        let modelObj:any = this.database.models[model];
        return await modelObj.findAll();
    }
 
    public getById = async(id:any, model:keyof DatabaseModels) : Promise<Object> => {
        let modelObj:any = this.database.models[model];
        return await modelObj.findOne({where: {id:id}});
    }

    public update = async(payload: Object, id:any, model:keyof DatabaseModels) : Promise<Object> => {
        return await this.database.models[model].update(<Partial<DatabaseAttributes>>payload, {where:{id: id}});
    }

    public delete = async(id:any, model:keyof DatabaseModels) : Promise<Object|null> => {
        return await this.database.models[model].destroy({where:{id: id}});
    }

    public getDatabaseObject() : Database{
        return this.database;
    }

    public SyncModelsAndDatabase() : void {
        this.database.sequelize.sync();
    }

}