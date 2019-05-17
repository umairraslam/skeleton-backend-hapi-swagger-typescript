import { Options, Dialect } from "sequelize";
import { OperatorsAliases } from "sequelize";

export default interface DatabaseConfigurations extends Options {
    database: string,
    username: string,
    password: string,
    params: {
        host: string,
        dialect: Dialect,
        operatorsAliases: OperatorsAliases
    }
}