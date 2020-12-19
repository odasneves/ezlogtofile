const yaml = require('js-yaml');
const fs = require('fs');
const ConfigurationError = require('../errors/ConfigurationError');

let configuration = {
    transport: {
        levels: []
    },
    path: {
        log_folder_path: null
    }
}

module.exports = {
    load: () => {
        let input_configuration;
        try {
            input_configuration = yaml.safeLoad(fs.readFileSync('logger_config.yml', 'utf8'));
        } catch (err) {
            throw new ConfigurationError('Configuration log not found: ' + err);  
        }

        if(input_configuration.transport) {
            if(input_configuration.transport.levels) {
                configuration.transport.levels = input_configuration.transport.levels;
            } else {
                throw new ConfigurationError('Configuration missing configuration -> transport.levels');  
            }
        } else {
            throw new ConfigurationError('Configuration missing configuration -> transport');
        }

        if(input_configuration.path) {
            if(input_configuration.path.log_folder_path) {
                configuration.path.log_folder_path = input_configuration.path.log_folder_path;
            } else {
                throw new ConfigurationError('Configuration missing configuration -> path.log_folder_path');
            }
        } else {
            throw new ConfigurationError('Configuration missing configuration -> path');
        }
    },
    get: () => {
        return configuration;
    }
};