import winston from 'winston';

const {createLogger, format, transports} = winston;
const {combine, printf, timestamp, colorize, label} = format;
const warnFilter = format((info: any) => {
    return info.level.includes('warn') ? info : false;
});
const errorFilter = format((info : any) => {
    return info.level.includes('error') ? info : false;
});
const myFormat = printf((info: any) => {
    return `${info.timestamp} | ${info.level} : ${info.message}`;
});
export const logger = createLogger({
    level: 'info',
    format: combine(
        colorize({all:true}),
        timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        myFormat
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename: "./logs/warn.log",
            level: 'warn',
            format: combine(warnFilter(), timestamp(), myFormat),
        }),
        new winston.transports.File({
            filename: "./logs/error.log",
            level: 'error',
            format: combine(errorFilter(), timestamp(), myFormat),
        }),
    ],
});

