const configurations = require('./configurations/module');
const logger_manager = require('./logger/manager');
const fs = require('fs');

let logger_manager_object = null;
let logger_manager_express_object = null;

const _setup = (configuration) => {
    if (!fs.existsSync(configuration.path.log_folder_path)){
        fs.mkdirSync(configuration.path.log_folder_path);
    }
}

module.exports = {
    get: () => {
        if(logger_manager_object === null) {
            configurations.load();
            const configuration = configurations.get();
            _setup(configuration);
            logger_manager.create(configuration);

            logger_manager_object = logger_manager.get();
            return logger_manager_object;
        } else {
            return logger_manager_object;
        }
    },
    getExpressMiddleware: () => {
        if(logger_manager_express_object === null) {
            configurations.load();
            const configuration = configurations.get();
            _setup(configuration);
            logger_manager.create(configuration);

            logger_manager_express_object = logger_manager.getExpressMiddleware();
            return logger_manager_express_object;
        } else {
            return logger_manager_express_object;
        }
    },
};