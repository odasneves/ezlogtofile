const logger_manager = require('./logger');

let loggers;

const _setup = () => {
    if(!loggers) {
        logger_manager.init();
        loggers = logger_manager.get();
    }
}

module.exports = {
    vanilla: () => {
        _setup();
        return loggers.vanilla;
    },
    express: () => {
        _setup();
        return loggers.express;
    },
    apollo: () => {
        _setup();
        return loggers.apollo;
    },
};
