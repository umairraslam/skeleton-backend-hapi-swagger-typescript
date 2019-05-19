import * as Hapi from "hapi";
import * as Joi from "joi";
import ServerConfigurations from "../../interfaces/server";
import Controller from "./controller";
import DatabaseService from "../../database/service";

export default (server: Hapi.Server, configs: ServerConfigurations, databaseService: DatabaseService) => {
    const controller = new Controller(configs, databaseService);
    server.bind(controller);
    server.route([
        {
            method: "POST",
            path: "/comment",
            options: {
                handler: controller.create,
                tags: ["api"],
                description: "Creates a Comment",
                validate: {
                    payload: {
                        text: Joi.string().required(),
                        author: Joi.number().required()
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
            path: "/comment",
            options: {
                handler: controller.getAll,
                tags: ["api"],
                description: "Retrieve all Comments",
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
            path: "/comment/{id}",
            options: {
                handler: controller.getById,
                tags: ["api"],
                description: "Retrieve Comments by id",
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
            path: "/comment/{id}",
            options: {
                handler: controller.update,
                tags: ["api"],
                description: "Update Comment",
                validate: {
                    params: {
                        id: Joi.string()
                    },
                    payload: {
                        text: Joi.string()
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
            path: "/comment/{id}",
            options: {
                handler: controller.delete,
                tags: ["api"],
                description: "Delete Comment",
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
            method: "GET",
            path: "/comment/{id}/author",
            options: {
                handler: controller.getAuthor,
                tags: ["api"],
                description: "Retrieve author of Comment",
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