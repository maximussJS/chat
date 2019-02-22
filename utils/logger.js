const {createLogger,transports} = require('winston')


const options = {
    file : {
        level: 'info',
        filename: process.env.LOGGER_FILENAME,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    console : {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
}


const logger = createLogger({
    transports : [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: true
})


logger.stream = {
    write : (message, encoding) => logger.info(message)
}


module.exports = logger
