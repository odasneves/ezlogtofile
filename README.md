# Simple-Logger
This module contains the logger structure/configuration used in my Projects. It uses [winston](https://www.npmjs.com/package/winston) as logger; Wrapped and configured for easy usage and integration.
## Examples

    import { Logger } from 'node-logger-by-odasneves';
    
    logger.silly('silly'); 
    logger.debug('debug'); 
    logger.verbose('verbose');
    logger.info('info'); 
    logger.warn('warn'); 
    logger.error('error');

### Express Middleware using [express-winston](https://www.npmjs.com/package/express-winston)
    const express = require('express'); 
    const app = express(); 
    const ExpressWinston = require('express-winston');
    import { Logger } from 'node-logger-by-odasneves';

    const expressLogger = ExpressWinston.logger({
        winstonInstance: Logger,
        msg: "HTTP {{req.method}} - {{res.statusCode}} {{res.responseTime}}ms {{req.url}}",
        colorize: process.env.NODE_ENV !== 'production',
    });

    app.use(expressLogger);   

## Configuration
This section shows this modules file configurations.

### .logger.json

  {
    "transport": {
      "levels": [
        "silly",
        "debug",
        "verbose",
        "info",
        "warn",
        "error",
        "combined"
      ]
    },
    "path": "logs"
  }