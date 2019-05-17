import * as Hapi from "hapi";
import * as Joi from "joi";
import ServerConfigurations from "../../interfaces/server";
import { Database } from "../../database";
import Controller from "./controller";

export default (server: Hapi.Server, configs: ServerConfigurations, database: Database) => {
    const controller = new Controller(configs, database);
    server.bind(controller);
    server.route([{
        method: "POST",
        path: "/user",
        options: {
            handler: controller.create,
            tags: ["api"],
            description: "Creates a User",
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    username: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "The user has been created."
                        },
                        "404": {
                            description: "Route not found."
                        },
                        "500": {
                            description: "Unable to create User."
                        }
                    }
                }
            }
        }
    },
    {
        method: "GET",
        path: "/user",
        options: {
            handler: controller.getAll,
            tags: ["api"],
            description: "Retrieve all users",
            validate: {
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "The user has been created."
                        },
                        "404": {
                            description: "Route not found."
                        },
                        "500": {
                            description: "Unable to create User."
                        }
                    }
                }
            }
        }
    },
    {
        method: "GET",
        path: "/user/{id}",
        options: {
            handler: controller.getById,
            tags: ["api"],
            description: "Retrieve users by id",
            validate: {
                params: {
                    id: Joi.string()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "The user has been created."
                        },
                        "404": {
                            description: "Route not found."
                        },
                        "500": {
                            description: "Unable to create User."
                        }
                    }
                }
            }
        }
    },
    {
        method: "PUT",
        path: "/user/{id}",
        options: {
            handler: controller.update,
            tags: ["api"],
            description: "Update user",
            validate: {
                params: {
                    id: Joi.string()
                },
                payload: {
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    username: Joi.string(),
                    email: Joi.string(),
                    password: Joi.string()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "The user has been created."
                        },
                        "404": {
                            description: "Route not found."
                        },
                        "500": {
                            description: "Unable to create User."
                        }
                    }
                }
            }
        }
    },
    {
        method: "DELETE",
        path: "/user/{id}",
        options: {
            handler: controller.delete,
            tags: ["api"],
            description: "Delete user",
            validate: {
                params: {
                    id: Joi.string()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "The user has been created."
                        },
                        "404": {
                            description: "Route not found."
                        },
                        "500": {
                            description: "Unable to create User."
                        }
                    }
                }
            }
        }
    }
]);

}