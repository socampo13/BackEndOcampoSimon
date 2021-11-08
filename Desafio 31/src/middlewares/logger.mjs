import winston from 'winston';

export const consoleLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'silly',
        }),
    ],
});

export const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: 'error.log',
        }),
    ],
});

export const warnLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'warn',
            filename: 'warn.log',
        }),
    ],
});