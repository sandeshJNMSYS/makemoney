//---------Logger file use to store logs----------

var winston = require('winston');
require('winston-daily-rotate-file');

//----------After 50m automatically zip-----------
var transport = new (winston.transports.DailyRotateFile)({
    filename: './logfiles/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '50m',
    maxFiles: '14d'
});

transport.on('rotate', function (oldFilename, newFilename) {
    
});
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY T hh:mm:ss.sss A' }),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} : ${info.level} : ${info.message}`,
    ));

var logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport
    ]
});

module.exports = {
    logger
};