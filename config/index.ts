import config from 'config';
import ServerConfigurations from '../src/interfaces/server';
import DatabaseConfigurations from '../src/interfaces/database';

export const getServerConfigurations = () : ServerConfigurations => {
    return config.get("server");
}

export const getDatabaseConfigurations = () : DatabaseConfigurations => {
    return config.get("database");
}