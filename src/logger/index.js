const Winston = require('winston');
const ExpressWinston = require('express-winston');

const configurations = require('./configuration');
const ApolloLogger = require('./ApolloLogger');

let vanilla = null;
let express = null;
let apollo = null;

module.exports = {
    init: () => {
        configurations.load();
        const configuration = configurations.get();

        let transports = [];
        const levels = configuration.transport.levels;
        const log_folder_path = configuration.path.log_folder_path;

        levels.forEach(level => {
            if(level === 'combined') {
                transports.push(new Winston.transports.File({ filename: log_folder_path + '/' + level + '.log', timestamp: true }));
            } else {
                transports.push(new Winston.transports.File({ filename: log_folder_path + '/' + level + '.log', level: level, timestamp: true }));
            }
        });

        vanilla = Winston.createLogger({
            level: 'silly',
            format: Winston.format.combine(
                Winston.format.label({ label: global.process.pid }),
                Winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                Winston.format.errors({ stack: true }),
                Winston.format.splat(),
                Winston.format.printf(({ level, message, label, timestamp }) => {
                    return `${timestamp} [${label}] ${level}: ${message}`;
                })
            ),
            transports: transports
        });

        if(process.env.NODE_ENV !== 'production') {
            vanilla.add(
                new Winston.transports.Console({
                    format: Winston.format.combine(
                        Winston.format.colorize()
                    )
                })
            );
        }

        express = ExpressWinston.logger({
            winstonInstance: vanilla,
            msg: "HTTP {{req.method}} - {{res.statusCode}} {{res.responseTime}}ms {{req.url}}",
            colorize: process.env.NODE_ENV !== 'production',
        });

        apollo = new ApolloLogger(vanilla);
    },
    get: () => {
        return {
            vanilla,
            express,
            apollo,
        };
    },
};
