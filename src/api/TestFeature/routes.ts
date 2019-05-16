import * as Hapi from "hapi";
import * as Joi from "joi";
import ServerConfigurations from "../../interfaces/server";
import Controller from "./controller";

export default (server: Hapi.Server, configs: ServerConfigurations) => {
    const controller = new Controller(configs);
    server.bind(controller);
    server.route({
        method: "GET",
        path: "/test/{id}",
        options: {
            handler: controller.testController,
            tags: ["api"],
            description: "Test Route",
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Route Successful."
                        },
                        "404": {
                            description: "Route not found."
                        }
                    }
                }
            }
        }
    })
}