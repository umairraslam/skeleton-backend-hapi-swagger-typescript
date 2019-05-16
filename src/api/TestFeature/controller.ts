import * as Hapi from "hapi";
import ServerConfigurations from "../../interfaces/server";
import { Request } from "../../interfaces/request";

export default class Controller {
    private configs: ServerConfigurations;

    constructor(configs: ServerConfigurations) {
        this.configs = configs;
    }

    public testController = (request: Request, h: Hapi.ResponseToolkit) : Hapi.ResponseObject => {
        try{
            return h.response("Route working! => " + request.params.id).code(200);
        } catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
}