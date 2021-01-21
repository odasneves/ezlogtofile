import fs from 'fs';

import {
  ConfigurationObject,
} from '../types';

import ConfigurationError from '../errors';

class Configuration {
  filename: string;

  constructor() {
    this.filename = '.logger.json';
  }

  loadConfiguration() : ConfigurationObject {
    let configuration : ConfigurationObject;
    try {
      configuration = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
    } catch (err) {
      throw new ConfigurationError(`Configuration file error: ${err}`);
    }

    if (!fs.existsSync(configuration.path)) {
      fs.mkdirSync(configuration.path);
    }

    return configuration;
  }
}

export {
  Configuration as default,
};
