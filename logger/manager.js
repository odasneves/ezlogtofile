const Winston = require('winston');

let logger_manager = null;

module.exports = {
    create: (configuration) => {
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

        logger_manager = Winston.createLogger({
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
            logger_manager.add(
                new Winston.transports.Console({
                    format: Winston.format.combine(
                        Winston.format.colorize()
                    )
                })
            );
        }
    },
    get: () => {
        return logger_manager;
    }
};