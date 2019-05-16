import config from 'config';
import ServerConfigurations from '../src/interfaces/server';

export const getServerConfigurations = (): ServerConfigurations => {
    return config.get("server");
}