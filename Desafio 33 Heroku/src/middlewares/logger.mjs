import winston from 'winston';

const { createLogger, format, transports } = winston;
const {  combine, timestamp, label, printf } = format;

const warnFilter = format((info) => {
    return info.level.includes('warn') ? info : false;
});

const errorFilter = format((info) => {
    return info.level.includes('error') ? info : false;
});

const myFormat = printf((info) => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

export const consoleLogger = createLogger({
    level: 'info',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ 
            filename: 'logs/error.log', 
            level: 'warn',
            format: combine(warnFilter(), timestamp(), myFormat)
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), myFormat),
        }),
    ],
});