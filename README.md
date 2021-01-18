
# Node-Logger
This module contains the logger structure/configuration used in my Projects. It uses [winston](https://www.npmjs.com/package/winston) as logger.  Created by gustavonuno1995@gmail.com on 25/11/2019.
## Content

 - Vanilla Logger - [winston](https://www.npmjs.com/package/winston)
 - Express Middleware - [winston](https://www.npmjs.com/package/winston) | [express-winston](https://www.npmjs.com/package/express-winston)
 - Apollo Server - [winston](https://www.npmjs.com/package/winston)

## Examples
### Vanilla

    const logger = require('node-logger-by-odasneves').vanilla();   
    logger.silly('silly'); 
    logger.debug('debug'); 
    logger.verbose('verbose');
    logger.info('info'); 
    logger.warn('warn'); 
    logger.error('error');

### Express
    const express = require('express'); 
    const app = express(); 
    const expresslogger = require('node-logger-by-odasneves').express();
    app.use(expresslogger);

### Apollo-Server
    const { ApolloServer } = require('apollo-server'); 
    const apollologger = require('node-logger-by-odasneves').apollo();
    const server = new ApolloServer({   plugins: [() => apollologger] });

## Configuration
This section shows this modules file configurations.

### logger_config.yml

    transport:
    levels:
        - silly
        - debug
        - verbose
        - info
        - warn
        - error
        - combined
    path:
        log_folder_path: <log_folder_path>

      
