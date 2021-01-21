import {
  transports,
  format,
  createLogger,
  Logger as LoggerType,
} from 'winston';

import Configuration from './utils';
import { ConfigurationObject } from './types';

const isProd = process.env.NODE_ENV === 'production';
const configuration = new Configuration();
const configurationObject : ConfigurationObject = configuration.loadConfiguration();

const winstonTransports = [];
const { levels: transportLevels } = configurationObject.transport;
const { path } = configurationObject;

transportLevels.forEach((level) => {
  if (level === 'combined') {
    winstonTransports.push(new transports.File({ filename: `${path}/${level}.log` }));
  } else {
    winstonTransports.push(new transports.File({ filename: `${path}/${level}.log`, level }));
  }
});

if (!isProd) {
  winstonTransports.push(
    new transports.Console({
      format: format.combine(
        format.colorize(),
      ),
    }),
  );
}

export const Logger : LoggerType = createLogger({
  level: 'silly',
  format: format.combine(
    format.label({ label: `${global.process.pid}` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({
      level, message, label, timestamp,
    }) => `${timestamp} [${label}] ${level}: ${message}`),
  ),
  transports: winstonTransports,
});